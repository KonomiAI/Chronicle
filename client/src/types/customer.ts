import { Gender } from './gender';
import { FormResponse } from './response';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface CustomerWithResponses extends Customer {
  responses: FormResponse[];
}

export type CustomerCreateDto = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt' | 'isDeleted'
> & { responseIds?: string[] };
