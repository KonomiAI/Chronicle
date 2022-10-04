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

  async get({ count, revenue }: CustomerViewSupportedFields) {
    let baseData = await this.prisma.customer.findMany({
      where: {
        isDeleted: false,
      },
    });
    if (count) {
      baseData = await this.addCountData(baseData);
    }
    if (revenue) {
      baseData = await this.addRevenueData(baseData);
    }
    return baseData;
  }

  private async addRevenueData(data: CustomerView[]) {
    for (const customer of data) {
      let revenue = 0;
      const visits = await this.prisma.activityEntry.findMany({
        where: {
          customerId: customer.id,
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

  private async addCountData(data: CustomerView[]): Promise<CustomerView[]> {
    const countData = await this.prisma.activityEntry.groupBy({
      by: ['customerId'],
      _count: {
        _all: true,
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
