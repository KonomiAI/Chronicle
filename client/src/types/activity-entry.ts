import { FormResponse } from './response';

interface Activity {
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
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  description: string;
  price: number;
  barcode: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    brand: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ActivityEntry {
  id: string;
  customer: Customer;
  activity?: Activity;
  products?: Product[];
  responses?: FormResponse[];
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface ActivityEntryDto {
  customerId: string;
  activityId?: string | null;
  variantId?: string[] | null;
  responseIds?: string[] | null;
}
