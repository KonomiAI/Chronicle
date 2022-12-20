import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [VisitController],
  providers: [VisitService, PrismaService],
  imports: [AuthModule],
})
export class VisitModule {}
