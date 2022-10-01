import { Prisma } from '@prisma/client';

export const devProductFixtures: Prisma.ProductCreateInput[] = [
  {
    name: 'Kirby',
    brand: 'Nintendo',
    variants: {
      createMany: {
        data: [
          {
            description: 'Fire',
            price: 1234,
            barcode: 'fire',
          },
          {
            description: 'Ice',
            price: 4567,
            barcode: 'ice',
          },
          {
            description: 'lightning',
            price: 8910,
            barcode: 'lightning',
          },
        ],
      },
    },
  },
  {
    name: 'Ultra Face Cream',
    brand: `Kiehl's`,
    variants: {
      createMany: {
        data: [
          { description: '28ml', barcode: '622', price: 2500 },
          {
            description: '50ml',
            barcode: '623',
            price: 4200,
          },
          {
            description: '125ml',
            barcode: '624',
            price: 7000,
          },
        ],
      },
    },
  },
  {
    brand: 'The Ordinary',
    name: 'Niacinamide 10% + Zinc 1%',
    variants: {
      createMany: {
        data: [
          {
            barcode: '782',
            description: '30ml',
            price: 800,
          },
          {
            barcode: '783',
            description: '60ml',
            price: 1300,
          },
        ],
      },
    },
  },
  {
    brand: 'KAYURAGI',
    name: 'KAYURAGI INCENSE',
    variants: {
      createMany: {
        data: [
          {
            price: 2200,
            barcode: '1001',
            description: 'SANDALWOOD',
          },
          {
            barcode: '1002',
            description: 'SAKURA',
            price: 2200,
          },
        ],
      },
    },
  },
];
