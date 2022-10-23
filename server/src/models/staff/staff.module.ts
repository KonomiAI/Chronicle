import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [AuthModule],
  controllers: [StaffController],
  providers: [StaffService, PrismaService],
})
export class StaffModule {}
