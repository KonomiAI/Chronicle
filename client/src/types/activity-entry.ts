import { Gender } from './gender';
import { Variant } from './product';
import { FormResponse } from './response';

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

export interface ActivityEntry {
  id: string;
  customer: Customer;
  activity?: ActivityEntryActivity;
  products?: Variant[];
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
