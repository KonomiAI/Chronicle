import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';

import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductModel[]> {
    return this.productService.products({});
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.product({ id });
  }

  @Post()
  async createProduct(
    @Body() { ...data }: CreateProductDto,
  ): Promise<ProductModel> {
    const { name, brand, imageUrl } = data;
    return this.productService.createProduct({
      name,
      brand,
      imageUrl,
    });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { ...data }: UpdateProductDto,
  ): Promise<ProductModel> {
    const { name, brand, imageUrl, isArchived } = data;
    return this.productService.updateProduct({
      where: { id },
      data: { name, brand, imageUrl, isArchived },
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct({ id });
  }
}
