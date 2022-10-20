export interface Variant {
  id: string;
  description: string;
  price: number;
  barcode: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  productId?: string;
  // eslint-disable-next-line no-use-before-define
  product: ProductWithoutVariant;
  isArchived: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
}

export type ProductWithoutVariant = Omit<Product, 'variants'>;

export interface VariantBodyDto {
  id?: string;
  description: string;
  price: number;
  barcode: string;
}

export interface PostProductBody {
  name: string;
  brand: string;
  imageUrl?: string[];
  variants: VariantBodyDto[];
}

export interface PutProductBody {
  name: string;
  brand: string;
  imageUrl?: string[];
}
