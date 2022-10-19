import { Prisma } from '@prisma/client';

export const devActivityFixtures: Prisma.ActivityCreateInput[] = [
  {
    name: 'The original dramatic healing facial',
    price: 8800,
  },
  {
    name: 'Celestial black diamond non surgical lift facial',
    price: 9800,
  },
  {
    name: 'Meso infusion hydration facial',
    price: 9800,
  },
  {
    name: 'Clarity anti-blemish facial',
    price: 9800,
  },
  {
    name: 'Rose quartz restorative facial',
    price: 9800,
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
