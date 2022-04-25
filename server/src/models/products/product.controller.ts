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
} from '../../interceptors/transform.interceptor';
import { Product } from '@prisma/client';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';

@Controller('products')
@UseInterceptors(TransformInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(Actions.READ, [Features.Inventory])
  @Get()
  async getProducts(): Promise<Response<Product[]>> {
    const products = await this.productService.products({});
    return {
      data: products,
    };
  }

  @Auth(Actions.READ, [Features.Inventory])
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Response<Product>> {
    const product = await this.productService.product({ id });
    return {
      data: product,
    };
  }

  @Auth(Actions.WRITE, [Features.Inventory])
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

  @Auth(Actions.WRITE, [Features.Inventory])
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

  @Auth(Actions.WRITE, [Features.Inventory])
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Response<Product>> {
    const product = await this.productService.deleteProduct({ id });
    return {
      data: product,
    };
  }
}
