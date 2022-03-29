import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import {
  Response,
  TransformInterceptor,
} from 'src/interceptors/transform.interceptor';
import { Product } from '@prisma/client';

@Controller('products')
@UseInterceptors(TransformInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Response<Product[]>> {
    const products = await this.productService.products({});
    return {
      data: products,
    };
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Response<Product>> {
    const product = await this.productService.product({ id });
    return {
      data: product,
    };
  }

  @Post()
  async createProduct(
    @Body() { ...data }: CreateProductDto,
  ): Promise<Response<Product>> {
    const { name, brand, imageUrl } = data;
    const product = await this.productService.createProduct({
      name,
      brand,
      imageUrl,
    });
    return {
      data: product,
    };
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { ...data }: UpdateProductDto,
  ): Promise<Response<Product>> {
    const { name, brand, imageUrl, isArchived } = data;
    const product = await this.productService.updateProduct({
      where: { id },
      data: { name, brand, imageUrl, isArchived },
    });
    return {
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Response<Product>> {
    const product = await this.productService.deleteProduct({ id });
    return {
      data: product,
    };
  }
}
