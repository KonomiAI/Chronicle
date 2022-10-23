import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuditService } from '../audit/audit.service';
import { IPController } from './ip.controller';
import { IPService } from './ip.service';

@Module({
  controllers: [IPController],
  providers: [IPService, AuditService, PrismaService],
  exports: [IPService],
})
export class IPModule {}
