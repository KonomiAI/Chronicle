import { Gender } from '@prisma/client';

interface ActivityEntryActivity {
  id: string;
  name: string;
  price: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Author {
  firstName: string;
  lastName: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  phone?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: string;
  description: string;
  price: number;
  barcode: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  productId?: string;
  isArchived: boolean;
}

export interface ActivityEntry {
  id: string;
  customer: Customer;
  activity?: ActivityEntryActivity;
  products?: Variant[];
  // Omitted for now
  // responses?: FormResponse[];
  createdAt: string;
  updatedAt: string;
  author: Author;
}
