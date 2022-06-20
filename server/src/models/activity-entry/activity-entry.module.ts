import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActivityEntryController } from './activity-entry.controller';
import { ActivityEntryService } from './activity-entry.service';

@Module({
  controllers: [ActivityEntryController],
  providers: [ActivityEntryService, PrismaService],
})
export class ActivityEntryModule {}
