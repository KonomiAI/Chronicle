export interface Variant {
  id: string;
  description: string;
  price: number;
  barcode: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  variants: Variant[];
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

export interface PostVariantBody {
  description: string;
  price: number;
  barcode: string;
}
