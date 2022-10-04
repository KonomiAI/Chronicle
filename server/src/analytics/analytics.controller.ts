import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VALIDATION_PIPE_OPTION } from 'src/utils/consts';
import { GetAnalyticsReportDto } from './analytics.dto';
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

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAnalyticsResult(
    @Query(new ValidationPipe(VALIDATION_PIPE_OPTION))
    { source, aggregateCols, start, end }: GetAnalyticsReportDto,
  ) {
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
