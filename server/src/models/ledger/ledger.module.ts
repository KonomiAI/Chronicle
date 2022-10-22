import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LedgerService } from './ledger.service';

@Module({
  providers: [LedgerService, PrismaService],
  exports: [LedgerService],
})
export class LedgerModule {}
