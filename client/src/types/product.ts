export interface Variant {
  id: string;
  description: string;
  price: number;
  barcode: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  productId: string;
  // eslint-disable-next-line no-use-before-define
  product: ProductWithoutVariant;
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

export interface PostVariantBody {
  description: string;
  price: number;
  barcode: string;
}

export interface PostProductBody {
  name: string;
  brand: string;
  imageUrl?: string[];
  variants: PostVariantBody[];
}

export interface PutProductBody {
  name: string;
  brand: string;
  imageUrl?: string[];
}
