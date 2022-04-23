import { Gender } from './gender';

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

export type CustomerCreateDto = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;
