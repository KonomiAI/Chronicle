import { Prisma } from '@prisma/client';

export const devActivityFixtures: Prisma.ActivityCreateInput[] = [
  {
    name: 'Turtwig',
    price: 1234,
  },
  {
    name: 'Chimchar',
    price: 5678,
  },
  {
    name: 'Piplup',
    price: 90,
  },
];
