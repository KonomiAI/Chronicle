import { Prisma } from '@prisma/client';

export const formBody = {
  sections: [
    {
      id: 's1',
      name: 'section 1',
      fields: [
        {
          id: 's1f1',
          name: 'text',
          description: 'test question 1',
          type: 'text',
          optional: false,
        },
        {
          id: 's1f2',
          name: 'long_text',
          description: 'test question 2',
          type: 'longText',
          optional: false,
        },
        {
          id: 's1f3',
          name: 'number',
          description: 'test question 3',
          type: 'number',
          optional: false,
        },
      ],
    },
    {
      id: 's2',
      name: 'section 2',
      fields: [
        {
          id: 's2f1',
          name: 'select1',
          description: 'select question 1',
          type: 'multipleChoice',
          optional: false,
          options: [
            {
              id: 'q1o1',
              label: 'select 1 option 1',
            },
            {
              id: 'q1o2',
              label: 'select 1 option 2',
            },
            {
              id: 'q1o3',
              label: 'select 1 option 3',
            },
          ],
        },
        {
          id: 's2f2',
          name: 'select2',
          description: 'select question 2',
          type: 'multipleChoice',
          optional: true,
          options: [
            {
              id: 'q2o1',
              label: 'select 2 option 1',
            },
            {
              id: 'q2o2',
              label: 'select 2 option 2',
            },
            {
              id: 'q2o3',
              label: 'select 2 option 3',
            },
          ],
        },
        {
          id: 's2f3',
          name: 'multi1',
          description: 'test question 1',
          type: 'multiSelect',
          optional: false,
          options: [
            {
              id: 'm1o1',
              label: 'multi select 1 option 1',
            },
            {
              id: 'm1o2',
              label: 'multi select 1 option 2',
            },
            {
              id: 'm1o3',
              label: 'multi select 1 option 3',
            },
          ],
        },
      ],
    },
  ],
};

export const devFormFixtures: Prisma.FormCreateInput = {
  title: 'Form 1',
  description: 'Test form #1',
  purpose: 'NO_PURPOSE',
};
