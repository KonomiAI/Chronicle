import { Injectable } from '@nestjs/common';
import { Variant, Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma.service';

@Injectable()
export class VariantService {
  constructor(private prisma: PrismaService) {}

  async variant(variantWhereUniqueInput: Prisma.VariantWhereUniqueInput) {
    return this.prisma.variant.findUnique({
      include: {
        ActivityEntry: true,
      },
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

  async createVariants(
    data: Prisma.VariantCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.variant.createMany({
      data,
    });
  }

  async updateVariant(params: {
    where: Prisma.VariantWhereUniqueInput;
    data: Prisma.VariantCreateInput;
  }): Promise<Variant> {
    const { where, data } = params;
    const [newVariant] = await this.prisma.$transaction([
      this.prisma.variant.create({
        data,
      }),
      this.prisma.variant.update({
        data: { isArchived: true },
        where,
      }),
    ]);
    return newVariant;
  }

  async deleteVariant(where: Prisma.VariantWhereUniqueInput): Promise<Variant> {
    return this.prisma.variant.delete({
      where,
    });
  }
}
