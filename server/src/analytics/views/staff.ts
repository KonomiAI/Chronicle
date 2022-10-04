import { PrismaService } from 'src/prisma.service';
import { DataViewOptions } from '../types/data-view';

export interface StaffViewSupportedFields extends DataViewOptions {
  count?: boolean;
  revenue?: boolean;
  activitiesPerformed?: boolean;
  activitiesRevenue?: boolean;
  productsSold?: boolean;
  productsRevenue?: boolean;
}

export interface StaffLite {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StaffView extends StaffLite {
  count?: number;
  revenue?: number;
  activitiesPerformed?: number;
  activitiesRevenue?: number;
  productsSold?: number;
  productsRevenue?: number;
}

interface StaffCountData {
  count: number;
  activityCount: number;
  productCount: number;
}

export class StaffDataView {
  constructor(private readonly prisma: PrismaService) {}

  async get(params: StaffViewSupportedFields) {
    let baseData = await this.prisma.staff.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    if ('count' in params) {
      baseData = await this.addCountData(
        baseData,
        params.activitiesPerformed,
        params.productsSold,
      );
    }
    if ('revenue' in params) {
      baseData = await this.addRevenueData(
        baseData,
        params.activitiesRevenue,
        params.productsRevenue,
      );
    }
    return baseData;
  }

  private async addRevenueData(
    data: StaffView[],
    shouldAddActivityRevenue = false,
    shouldAddProductRevenue = false,
  ): Promise<StaffView[]> {
    for (const staff of data) {
      let revenue = 0;
      let activityRevenue = 0;
      let productRevenue = 0;
      const visits = await this.prisma.activityEntry.findMany({
        where: {
          staffId: staff.id,
        },
        include: {
          activity: true,
          products: true,
        },
      });
      visits.forEach((visit) => {
        revenue += visit.activity?.price ?? 0;
        activityRevenue += visit.activity?.price ?? 0;
        visit.products?.forEach((product) => {
          revenue += product.price;
          productRevenue += product.price;
        });
      });
      staff.revenue = revenue;
      if (shouldAddActivityRevenue) {
        staff.activitiesRevenue = activityRevenue;
      }
      if (shouldAddProductRevenue) {
        staff.productsRevenue = productRevenue;
      }
    }
    return data;
  }

  private async addCountData(
    data: StaffView[],
    shouldAddActivityCount = false,
    shouldAddProductCount = false,
  ): Promise<StaffView[]> {
    const countData = (
      await this.prisma.activityEntry.findMany({
        include: {
          activity: true,
          products: true,
        },
      })
    ).reduce((acc, entry) => {
      const staffId = entry.staffId;
      if (staffId) {
        acc[staffId] = {
          count: (acc[staffId]?.count ?? 0) + 1,
          activityCount:
            (acc[staffId]?.activityCount ?? 0) + (entry.activity ? 1 : 0),
          productCount:
            (acc[staffId]?.productCount ?? 0) + entry.products.length,
        };
      }
      return acc;
    }, {} as Record<string, StaffCountData>);
    return data.map((staff) => {
      const count = countData[staff.id];
      return {
        ...staff,
        ...(shouldAddActivityCount
          ? { activitiesPerformed: count?.activityCount }
          : {}),
        ...(shouldAddProductCount ? { productsSold: count?.productCount } : {}),
        count: count?.count ?? 0,
      };
    });
  }
}
