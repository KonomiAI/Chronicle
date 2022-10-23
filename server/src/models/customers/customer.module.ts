import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuditService } from '../audit/audit.service';
import { LedgerModule } from '../ledger/ledger.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, AuditService],
  imports: [LedgerModule],
})
export class CustomerModule {}
