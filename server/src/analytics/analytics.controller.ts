import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActivityDataView } from './views/activity';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async testEndpoint(
    @Query() { source, aggregateCols }: Record<string, string>,
  ) {
    if (source === 'activity') {
      const view = new ActivityDataView(this.prisma);
      const data = await view.get(this.parseAggregateCols(aggregateCols));
      return data;
    }
    throw new HttpException(
      'Invalid source, valid options: activity | product | customer',
      400,
    );
  }

  parseAggregateCols(aggregateCols: string) {
    const res: Record<string, boolean> = {};

    aggregateCols.split(',').forEach((col) => {
      res[col] = true;
    });
    return res;
  }
}
