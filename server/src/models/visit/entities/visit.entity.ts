import { Prisma } from '@prisma/client';

export const VISIT_SELECT: Prisma.VisitSelect = {
  id: true,
  visitDate: true,
  updatedAt: true,
  createdAt: true,
  activityEntries: {
    select: {
      id: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      activity: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
      products: {
        select: {
          id: true,
          price: true,
          product: {
            select: {
              name: true,
              brand: true,
            },
          },
        },
      },
    },
  },
  charge: {
    select: {
      id: true,
      amount: true,
      description: true,
      createdDt: true,
    },
  },
  customer: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  },
} as const;
