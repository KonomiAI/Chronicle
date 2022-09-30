import { Prisma } from '@prisma/client';

export const devActivityFixtures: Prisma.ActivityCreateInput[] = [
  {
    name: 'Facial Exfoliation',
    price: 8800,
  },
  {
    name: 'Initial Consultation',
    price: 4200,
  },
  {
    name: 'Silkpeel Dermalifusion',
    price: 9000,
  },
  {
    name: 'Microneedling',
    price: 22000,
  },
  {
    name: 'AlgoMasking',
    price: 6800,
  },
];
