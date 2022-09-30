import { JSONSchemaType } from 'ajv';

interface FormCommons {
  id: string;
  name: string;
  description?: string;
}

export interface FormOptionValue {
  id: string;
  label: string;
}

export interface FormOptionDataSource {
  url: string;
  idField: string;
  labelField: string;
  optionsLocation: string;
}

export enum FormSupportedFieldTypes {
  TEXT = 'text',
  MULTIPLE_CHOICE = 'multipleChoice',
  LONG_TEXT = 'longText',
  NUMBER = 'number',
  MULTI_SELECT = 'multiSelect',
  DATA_SOURCE_SELECT = 'dataSourceSelect',
}

export interface FormFieldSchema extends FormCommons {
  type: FormSupportedFieldTypes;
  optional: boolean;
  options: FormOptionValue[] | FormOptionDataSource;
}

export interface FormSectionSchema extends FormCommons {
  fields: FormFieldSchema[];
}

export interface FormTemplateSchema {
  sections: FormSectionSchema[];
}

const FormTemplateSchemaV1: JSONSchemaType<FormTemplateSchema> = {
  type: 'object',
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              required: [],
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string', nullable: true },
                type: {
                  type: 'string',
                  enum: [
                    FormSupportedFieldTypes.DATA_SOURCE_SELECT,
                    FormSupportedFieldTypes.LONG_TEXT,
                    FormSupportedFieldTypes.MULTIPLE_CHOICE,
                    FormSupportedFieldTypes.MULTI_SELECT,
                    FormSupportedFieldTypes.NUMBER,
                    FormSupportedFieldTypes.TEXT,
                  ],
                },
                optional: {
                  type: 'boolean',
                },
                options: {
                  anyOf: [
                    {
                      type: 'object',
                      properties: {
                        url: { type: 'string' },
                        idField: { type: 'string' },
                        labelField: { type: 'string' },
                        optionsLocation: { type: 'string' },
                      },
                      required: ['url', 'idField', 'labelField'],
                    },
                    {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          label: { type: 'string' },
                        },
                        required: ['id', 'label'],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        required: ['fields', 'name'],
      },
    },
  },
  required: ['sections'],
};

export default FormTemplateSchemaV1;
