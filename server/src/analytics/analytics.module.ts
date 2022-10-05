import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  controllers: [AnalyticsController],
  providers: [PrismaService],
})
export class AnalyticsModule {}
