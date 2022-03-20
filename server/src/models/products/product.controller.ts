import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('products')
@UseInterceptors(TransformInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    const result = await this.productService.products({});
    return {
      message: 'SUCCESS',
      result,
    };
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const result = await this.productService.product({ id });
    return {
      message: 'SUCCESS',
      result,
    };
  }

  @Post()
  async createProduct(@Body() { ...data }: CreateProductDto) {
    const { name, brand, imageUrl } = data;
    const result = await this.productService.createProduct({
      name,
      brand,
      imageUrl,
    });
    return {
      message: 'SUCCESS',
      result,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { ...data }: UpdateProductDto,
  ) {
    const { name, brand, imageUrl, isArchived } = data;
    const result = await this.productService.updateProduct({
      where: { id },
      data: { name, brand, imageUrl, isArchived },
    });
    return {
      message: 'SUCCESS',
      result,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productService.deleteProduct({ id });
    return {
      message: 'SUCCESS',
      result,
    };
  }
}
