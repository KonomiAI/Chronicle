import { JSONSchemaType } from 'ajv';

interface FormCommons {
  id: string;
  name: string;
  description?: string;
}

interface FormOptionValue {
  id: string;
  label: string;
}

interface FormOptionDataSource {
  url: string;
  idField: string;
  labelField: string;
  optionsLocation: string;
}

interface FormFieldSchema extends FormCommons {
  type: 'text' | 'multipleChoice' | 'longText' | 'number' | 'multiSelect';
  optional: boolean;
  options: FormOptionValue[] | FormOptionDataSource;
}

interface FormSectionSchema extends FormCommons {
  fields: FormFieldSchema[];
}

export interface FormTemplateSchema extends FormCommons {
  sections: FormSectionSchema[];
}

const FormTemplateSchemaV1: JSONSchemaType<FormTemplateSchema> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
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
  required: ['name', 'sections'],
};

export default FormTemplateSchemaV1;
