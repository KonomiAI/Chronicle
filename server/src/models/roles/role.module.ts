import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaService } from '../../prisma.service';
import { AuditService } from '../audit/audit.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, AuditService],
})
export class RoleModule {}
