import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma.service';
import { VariantModule } from './variants/variant.module';
import { VariantService } from './variants/variant.service';
import { AuditService } from '../audit/audit.service';

@Module({
  imports: [VariantModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, VariantService, AuditService],
})
export class ProductModule {}
