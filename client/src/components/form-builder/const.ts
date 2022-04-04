import { FormFieldSchema, FormSectionSchema, FormTemplateSchema } from 'c-form';
import { secureRandomString } from '../../utils';

export const DEFAULT_FIELD_VAL: FormFieldSchema = {
  id: secureRandomString(16),
  name: '',
  description: '',
  optional: false,
  type: 'text',
  options: [],
};

export const DEFAULT_SECTION_VAL: FormSectionSchema = {
  name: '',
  description: '',
  id: secureRandomString(16),
  fields: [DEFAULT_FIELD_VAL],
};

export const DEFAULT_SCHEMA_VAL: Partial<FormTemplateSchema> = {
  sections: [DEFAULT_SECTION_VAL],
};
