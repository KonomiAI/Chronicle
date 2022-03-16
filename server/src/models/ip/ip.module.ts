import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IPController } from './ip.controller';
import { IPService } from './ip.service';

@Module({
  controllers: [IPController],
  providers: [IPService, PrismaService],
  exports: [IPService],
})
export class IPModule {}
