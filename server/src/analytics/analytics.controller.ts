import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { PrismaService } from 'src/prisma.service';
import { VALIDATION_PIPE_OPTION } from 'src/utils/consts';
import { GetAnalyticsReportDto } from './analytics.dto';
import { DataViewOptions } from './types/data-view';
import { parseAggregateCols } from './utils';
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
@UseInterceptors(TransformInterceptor)
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
      ...parseAggregateCols(aggregateCols),
    });
    return data;
  }
}
