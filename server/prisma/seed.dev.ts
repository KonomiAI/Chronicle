import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { devActivityFixtures } from './fixtures/dev/activities';
import { devCustomerFixtures } from './fixtures/dev/customers';
import { devProductFixtures } from './fixtures/dev/products';

export const seedSuperUser = async (
  roleIds: string[],
): Promise<Prisma.StaffCreateInput> => ({
  firstName: 'Test',
  lastName: 'Account',
  email: 'test@konomi.ai',
  authKey: await bcrypt.hash('test', 10),
  isSuperUser: true,
  roleIds,
});

export const seedTestCustomers = async (prisma: PrismaClient) =>
  prisma.customer.createMany({
    data: devCustomerFixtures,
  });

export const seedTestProducts = async (prisma: PrismaClient) =>
  prisma.product.createMany({
    data: devProductFixtures,
  });

export const seedTestActivities = async (prisma: PrismaClient) =>
  prisma.activity.createMany({
    data: devActivityFixtures,
  });

export const devSeedProcedure = async (prisma: PrismaClient) => {
  const roles = await prisma.role.findMany({
    select: {
      id: true,
    },
  });

  await prisma.staff.create({
    data: await seedSuperUser(roles.map((r) => r.id)),
  });

  await seedTestCustomers(prisma);
  await seedTestProducts(prisma);
  await seedTestActivities(prisma);
};
