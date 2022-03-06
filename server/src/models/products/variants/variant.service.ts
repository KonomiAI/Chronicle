import { Injectable } from '@nestjs/common';
import { Variant, Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma.service';

@Injectable()
export class VariantService {
  constructor(private prisma: PrismaService) {}

  async variant(
    variantWhereUniqueInput: Prisma.VariantWhereUniqueInput,
  ): Promise<Variant | null> {
    return this.prisma.variant.findUnique({
      where: variantWhereUniqueInput,
    });
  }

  async variants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VariantWhereUniqueInput;
    where?: Prisma.VariantWhereInput;
    orderBy?: Prisma.VariantOrderByWithRelationInput;
  }): Promise<Variant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.variant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createVariant(data: Prisma.VariantCreateInput): Promise<Variant> {
    return this.prisma.variant.create({
      data,
    });
  }

  async updateVariant(params: {
    where: Prisma.VariantWhereUniqueInput;
    data: Prisma.VariantUpdateInput;
  }): Promise<Variant> {
    const { where, data } = params;
    return this.prisma.variant.update({
      data,
      where,
    });
  }

  async deleteVariant(where: Prisma.VariantWhereUniqueInput): Promise<Variant> {
    return this.prisma.variant.delete({
      where,
    });
  }
}
