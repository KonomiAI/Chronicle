import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { devActivityFixtures } from './fixtures/dev/activities';
import { devCustomerFixtures } from './fixtures/dev/customers';
import { devFormFixtures, formBody } from './fixtures/dev/forms';
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

export const seedTestForms = async (prisma: PrismaClient) => {
  const form = await prisma.form.create({
    data: devFormFixtures,
  });

  const formVersion = await prisma.formVersion.create({
    data: {
      formId: form.id,
      body: formBody,
    },
  });

  await prisma.form.update({
    where: {
      id: form.id,
    },
    data: {
      latestFormId: formVersion.id,
    },
  });
};

export const seedTestProducts = async (prisma: PrismaClient) =>
  prisma.product.createMany({
    data: devProductFixtures,
  });

export const seedTestActivities = async (prisma: PrismaClient) =>
  prisma.activity.createMany({
    data: devActivityFixtures,
  });

export const devSeedProcedure = async (prisma: PrismaClient) => {
  console.log('Seeding development data');
  const roles = await prisma.role.findMany({
    select: {
      id: true,
    },
  });

  await prisma.staff.create({
    data: await seedSuperUser(roles.map((r) => r.id)),
  });
  await seedTestCustomers(prisma);
  await seedTestForms(prisma);
  await seedTestProducts(prisma);
  await seedTestActivities(prisma);
  console.log('Development data seeding complete');
};
