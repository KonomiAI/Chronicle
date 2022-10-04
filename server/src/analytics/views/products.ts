import { Product, Variant } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DataView, DataViewOptions } from '../types/data-view';

export interface ProductViewSupportedFields extends DataViewOptions {
  count?: boolean;
  revenue?: boolean;
}

export interface VariantView extends Variant {
  count?: number;
  revenue?: number;
}

export interface ProductView extends Product {
  count?: number;
  revenue?: number;
  children?: Record<string, VariantView>;
  variants?: VariantView[];
}

export class ProductDataView extends DataView<ProductView> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async get({ count, revenue, ...opts }: ProductViewSupportedFields) {
    let hasCount = false;
    let baseData: ProductView[] = await this.prisma.product.findMany({
      where: {
        isArchived: false,
      },
      include: {
        variants: true,
      },
    });
    if (count) {
      baseData = await this.addCountData(baseData, opts);
      hasCount = true;
    }
    if (revenue) {
      baseData = await this.addRevenueData(baseData, opts, hasCount);
    }

    return this.remapVariantToChildren(baseData);
  }

  private async addRevenueData(
    data: ProductView[],
    opts: DataViewOptions,
    hasCount = false,
  ) {
    let newData = hasCount ? data : await this.addCountData(data, opts);
    newData = newData.map((product) => ({
      ...product,
      revenue: product.variants.reduce(
        (acc, v) => acc + (v.count ?? 0) * v.price,
        0,
      ),
    }));
    for (const product of newData) {
      product.variants = product.variants.map((v) => ({
        ...v,
        revenue: (v.count ?? 0) * v.price,
      }));
    }
    return newData;
  }

  private async addCountData(
    data: ProductView[],
    { start, end }: DataViewOptions,
  ): Promise<ProductView[]> {
    const countData = (
      await this.prisma.activityEntry.findMany({
        where: {
          variantId: {
            isEmpty: false,
          },
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      })
    ).reduce((acc, entry) => {
      for (const vid of entry.variantId) {
        acc[vid] = acc[vid] ? acc[vid] + 1 : 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return data.map((product) => {
      let totalCount = 0;
      for (const v of product.variants) {
        const count = countData[v.id];
        totalCount += count ?? 0;
        v.count = count ?? 0;
      }
      return {
        ...product,
        count: totalCount,
      };
    });
  }

  private async remapVariantToChildren(data: ProductView[]) {
    return data.map((product) => {
      const childrenData: Record<string, VariantView> = {};
      for (const v of product.variants) {
        childrenData[v.id] = v;
      }
      return {
        ...product,
        children: childrenData,
      };
    });
  }
}
