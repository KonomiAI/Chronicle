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

interface Charge {
  id: string;
  description: string;
  amount: number;
  createdDt: string;
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
  // There should always only be 1 item per charge
  charge: Charge[];
  tipCharged: number;
}

export interface ActivityEntryDto {
  customerId: string;
  activityId?: string | null;
  variantId?: string[] | null;
  responseIds?: string[] | null;
}

export interface ActivityEntryChargeSummary {
  balance: number;
  amount: number;
  remaining: number;
}

export interface ChargeCreateDto {
  description: string;
  tipAmount: number;
}
