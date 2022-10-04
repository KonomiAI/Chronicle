import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DataViewOptions } from '../types/data-view';

export interface CustomerViewSupportedFields extends DataViewOptions {
  count?: boolean;
  revenue?: boolean;
}

export interface CustomerView extends Customer {
  count?: number;
  revenue?: number;
}

export class CustomerDataView {
  constructor(private readonly prisma: PrismaService) {}

  async get({ count, revenue, ...opts }: CustomerViewSupportedFields) {
    let baseData = await this.prisma.customer.findMany({
      where: {
        isDeleted: false,
      },
    });
    if (count) {
      baseData = await this.addCountData(baseData, opts);
    }
    if (revenue) {
      baseData = await this.addRevenueData(baseData, opts);
    }
    return baseData;
  }

  private async addRevenueData(
    data: CustomerView[],
    { start, end }: DataViewOptions,
  ) {
    for (const customer of data) {
      let revenue = 0;
      const visits = await this.prisma.activityEntry.findMany({
        where: {
          customerId: customer.id,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        include: {
          activity: true,
          products: true,
        },
      });
      visits.forEach((visit) => {
        revenue += visit.activity?.price ?? 0;
        visit.products?.forEach((product) => {
          revenue += product.price;
        });
      });
      customer.revenue = revenue;
    }
    return data;
  }

  private async addCountData(
    data: CustomerView[],
    { start, end }: DataViewOptions,
  ): Promise<CustomerView[]> {
    const countData = await this.prisma.activityEntry.groupBy({
      by: ['customerId'],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
    return data.map((customer) => {
      const count = countData.find((c) => c.customerId === customer.id);
      return {
        ...customer,
        count: count?._count._all ?? 0,
      };
    });
  }
}
