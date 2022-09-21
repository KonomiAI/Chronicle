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

export interface FormFieldSchema extends FormCommons {
  type:
    | 'text'
    | 'multipleChoice'
    | 'longText'
    | 'number'
    | 'multiSelect'
    | 'dataSourceSelect';
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
                    'longText',
                    'multiSelect',
                    'multipleChoice',
                    'number',
                    'text',
                    'dataSourceSelect',
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
