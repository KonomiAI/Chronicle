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
import { Variant as VariantModel } from '@prisma/client';

import { VariantService } from './variant.service';
import { CreateVariantDto, UpdateVariantDto } from './variant.dto';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { Auditable } from 'src/auth/audit.decorator';

@Controller('products/:productId/variants')
@UseInterceptors(TransformInterceptor)
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Auth(Actions.READ, [Features.Inventory])
  @Get()
  async getVariants(
    @Param('productId') productId: string,
  ): Promise<VariantModel[]> {
    return this.variantService.variants({
      where: {
        productId,
      },
    });
  }

  @Auth(Actions.READ, [Features.Inventory])
  @Get(':variantId')
  async getVariantById(@Param('variantId') id: string): Promise<VariantModel> {
    return this.variantService.variant({ id });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Post()
  @Auditable()
  async createVariant(
    @Param('productId') productId: string,
    @Body() { ...data }: CreateVariantDto,
  ): Promise<VariantModel> {
    const { description, price, barcode } = data;
    return this.variantService.createVariant({
      description,
      price,
      barcode,
      product: {
        connect: {
          id: productId,
        },
      },
    });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Put(':variantId')
  @Auditable()
  async updateVariant(
    @Param('variantId') variantId: string,
    @Param('productId') productId: string,
    @Body() { ...data }: UpdateVariantDto,
  ): Promise<VariantModel> {
    const { description, price, barcode, isAvailable } = data;
    return this.variantService.updateVariant({
      where: { id: variantId },
      data: {
        description,
        price,
        barcode,
        isAvailable,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Delete(':variantId')
  @Auditable()
  async deleteVariant(
    @Param('variantId') variantId: string,
  ): Promise<VariantModel> {
    return this.variantService.deleteVariant({ id: variantId });
  }
}
