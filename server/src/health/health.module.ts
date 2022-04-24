import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma.service';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma-health-indicator/prisma-health-indicator.service';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [PrismaHealthIndicator, PrismaService],
})
export class HealthModule {}
