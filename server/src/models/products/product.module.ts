import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma.service';
import { VariantModule } from './variants/variant.module';

@Module({
  imports: [VariantModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
