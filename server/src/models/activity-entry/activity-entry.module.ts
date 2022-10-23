import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LedgerModule } from '../ledger/ledger.module';
import { ActivityEntryController } from './activity-entry.controller';
import { ActivityEntryService } from './activity-entry.service';

@Module({
  controllers: [ActivityEntryController],
  providers: [ActivityEntryService, PrismaService],
  imports: [LedgerModule],
})
export class ActivityEntryModule {}
