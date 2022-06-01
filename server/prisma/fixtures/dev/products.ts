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
];
