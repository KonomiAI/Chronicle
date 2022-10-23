import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaService } from '../../prisma.service';
import { AuditService } from '../audit/audit.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService, AuditService],
})
export class ActivityModule {}
