import { FormTemplateSchema } from '@konomi.ai/c-form';

export enum FormPurpose {
  INVENTORY = 'INVENTORY',
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
  ACTIVITY_ENTRY = 'ACTIVITY_ENTRY',
}

export interface FormVersion {
  id: string;
  body: FormTemplateSchema;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  purpose: FormPurpose;
  createdAt: string;
  updatedAt: string;
  latestFormVersion: FormVersion;
}

export interface PostFormBody {
  title: string;
  description: string;
  purpose: FormPurpose;
  body: FormTemplateSchema;
}
