import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { PrismaService } from '../../prisma.service';
import { AuditService } from '../audit/audit.service';

@Module({
  controllers: [FormController],
  providers: [FormService, PrismaService, AuditService],
})
export class FormModule {}
