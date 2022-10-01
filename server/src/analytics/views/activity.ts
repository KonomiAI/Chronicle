import { Activity } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export interface ActivityViewSupportedFields {
  count?: boolean;
  revenue?: boolean;
}

export interface ActivityView extends Activity {
  count?: number;
  revenue?: number;
}

export class ActivityDataView {
  constructor(private readonly prisma: PrismaService) {}

  async get({ count, revenue }: ActivityViewSupportedFields) {
    let baseData = await this.prisma.activity.findMany({
      where: {
        isArchived: false,
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

  private async addRevenueData(data: Activity[]) {
    const newData = await this.addCountData(data);
    return newData.map((a) => ({
      ...a,
      revenue: (a.count ?? 0) * a.price,
    }));
  }

  private async addCountData(data: Activity[]): Promise<ActivityView[]> {
    const countData = await this.prisma.activityEntry.groupBy({
      by: ['activityId'],
      _count: {
        _all: true,
      },
    });
    return data.map((activity) => {
      const count = countData.find((c) => c.activityId === activity.id);
      return {
        ...activity,
        count: count?._count._all ?? 0,
      };
    });
  }
}
