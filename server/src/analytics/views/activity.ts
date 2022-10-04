import { Activity } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DataView, DataViewOptions } from '../types/data-view';

export interface ActivityViewSupportedFields extends DataViewOptions {
  count?: boolean;
  revenue?: boolean;
}

export interface ActivityView extends Activity {
  count?: number;
  revenue?: number;
}

export class ActivityDataView extends DataView<ActivityView> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async get({ count, revenue, start, end }: ActivityViewSupportedFields) {
    let baseData: ActivityView[] = await this.prisma.activity.findMany({
      where: {
        isArchived: false,
      },
    });
    if (count) {
      baseData = await this.addCountData(baseData, { start, end });
    }
    if (revenue) {
      baseData = await this.addRevenueData(baseData, { start, end });
    }
    return baseData;
  }

  private async addRevenueData(data: Activity[], opts: DataViewOptions) {
    const newData = await this.addCountData(data, opts);
    return newData.map((activity) => ({
      ...activity,
      revenue: (activity.count ?? 0) * activity.price,
    }));
  }

  private async addCountData(
    data: Activity[],
    { start, end }: DataViewOptions,
  ): Promise<ActivityView[]> {
    const countData = await this.prisma.activityEntry.groupBy({
      by: ['activityId'],
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
    return data.map((activity) => {
      const count = countData.find((c) => c.activityId === activity.id);
      return {
        ...activity,
        count: count?._count._all ?? 0,
      };
    });
  }
}
