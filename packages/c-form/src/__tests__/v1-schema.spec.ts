import { describe, expect, it } from '@jest/globals';
import { FormSupportedFieldTypes, FormTemplateSchema } from '../templates';
import { validateWithLatest } from '../utils/validator';

describe('v1 custom form template schema', () => {
  it('will validate simple valid schema', () => {
    const schema: FormTemplateSchema = {
      sections: [
        {
          id: 'test',
          fields: [
            {
              id: 'testField',
              name: 'Test Field',
              optional: false,
              options: [],
              type: FormSupportedFieldTypes.TEXT,
            },
          ],
          name: 'test',
        },
      ],
    };
    const res = validateWithLatest(schema);
    expect(res).toEqual(true);
  });
  it('will validate valid schema with single section multiple fields', () => {
    const schema: FormTemplateSchema = {
      sections: [
        {
          id: 'test',
          fields: [
            {
              id: 'testField',
              name: 'Test Field',
              optional: false,
              options: [],
              type: FormSupportedFieldTypes.TEXT,
            },
            {
              id: 'testField2',
              name: 'Test Field 2',
              optional: true,
              options: [{ id: 'testOption', label: 'test option' }],
              type: FormSupportedFieldTypes.MULTIPLE_CHOICE,
            },
          ],
          name: 'test',
        },
      ],
    };
    const res = validateWithLatest(schema);
    expect(res).toEqual(true);
  });
});
