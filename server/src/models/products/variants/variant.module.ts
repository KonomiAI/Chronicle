import { Module } from '@nestjs/common';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { PrismaService } from '../../../prisma.service';
import { AuditService } from 'src/models/audit/audit.service';

@Module({
  controllers: [VariantController],
  providers: [PrismaService, VariantService, AuditService],
})
export class VariantModule {}
