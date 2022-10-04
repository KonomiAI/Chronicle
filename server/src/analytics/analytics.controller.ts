import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DataViewOptions } from './types/data-view';
import { ActivityDataView } from './views/activity';
import { CustomerDataView } from './views/customer';
import { ProductDataView } from './views/products';
import { StaffDataView } from './views/staff';

const VIEWS = {
  activity: ActivityDataView,
  customer: CustomerDataView,
  product: ProductDataView,
  staff: StaffDataView,
};

const SUPPORTED_VIEWS = new Set(Object.keys(VIEWS));

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAnalyticsResult(
    @Query() { source, aggregateCols, start, end }: Record<string, string>,
  ) {
    if (!start || !end) {
      throw new HttpException('start and end are required to be date', 400);
    }

    if (!SUPPORTED_VIEWS.has(source)) {
      throw new HttpException(
        'Invalid source, valid options: activity | product | customer | staff',
        400,
      );
    }

    const options: DataViewOptions = {
      start: new Date(start),
      end: new Date(end),
    };

    const view = new VIEWS[source](this.prisma);
    const data = await view.get({
      ...options,
      ...this.parseAggregateCols(aggregateCols),
    });
    return data;
  }

  parseAggregateCols(aggregateCols: string) {
    const res: Record<string, boolean> = {};

    aggregateCols.split(',').forEach((col) => {
      res[col] = true;
    });
    return res;
  }
}
