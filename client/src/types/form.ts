import { FormTemplateSchema } from '@konomi.ai/c-form';

export enum FormPurpose {
  INVENTORY = 'INVENTORY',
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
  ACTIVITY_ENTRY = 'ACTIVITY_ENTRY',
  NO_PURPOSE = 'NO_PURPOSE',
}

export interface FormVersion {
  id: string;
  body: FormTemplateSchema;
  version: string;
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

export interface FormWithoutLatestForm {
  id: string;
  title: string;
  description: string;
  purpose: FormPurpose;
  createdAt: string;
  updatedAt: string;
}

export interface FormVersionWithForm extends FormVersion {
  form: FormWithoutLatestForm;
}

export interface PostFormBody {
  title: string;
  description: string;
  purpose: FormPurpose;
  body: FormTemplateSchema;
}
