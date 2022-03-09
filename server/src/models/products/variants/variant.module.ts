import { Module } from '@nestjs/common';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { PrismaService } from '../../../prisma.service';

@Module({
  controllers: [VariantController],
  providers: [VariantService, PrismaService],
})
export class VariantModule {}
