import {
  FormFieldSchema,
  FormOptionDataSource,
  FormSectionSchema,
  FormTemplateSchema,
} from '@konomi.ai/c-form';
import { secureRandomString } from '../../utils';

export const DEFAULT_FIELD_VAL: () => FormFieldSchema = () => ({
  id: secureRandomString(16),
  name: '',
  description: '',
  optional: false,
  type: 'text',
  options: [],
});

export const DEFAULT_SECTION_VAL: () => FormSectionSchema = () => ({
  name: '',
  description: '',
  id: secureRandomString(16),
  fields: [DEFAULT_FIELD_VAL()],
});

export const DEFAULT_SCHEMA_VAL: Partial<FormTemplateSchema> = {
  sections: [DEFAULT_SECTION_VAL()],
};

export const SUPPORTED_OPTION_SOURCES: FormOptionDataSource[] = [
  {
    idField: 'id',
    labelField: 'firstName',
    url: '/customers',
    optionsLocation: 'data',
  },
  {
    idField: 'id',
    labelField: 'name',
    url: '/activities',
    optionsLocation: 'data',
  },
  {
    idField: 'id',
    labelField: 'description',
    url: '/products',
    optionsLocation: 'data',
  },
];

export const SUPPORTED_OPTION_SOURCE_NAME_MAP: Record<string, string> = {
  '/customers': 'Customers',
  '/activities': 'Activities',
  '/products': 'Products',
};
