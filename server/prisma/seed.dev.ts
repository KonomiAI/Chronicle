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
  if (
    await prisma.form.findFirst({
      where: {
        title: 'Dev seed form 1',
      },
    })
  ) {
    console.log('Dev seed form already exists, skipping;');
    return;
  }
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

export const seedTestProducts = async (prisma: PrismaClient) => {
  for (const fixture of devProductFixtures) {
    if (
      await prisma.product.findFirst({
        where: {
          name: fixture.name,
        },
      })
    ) {
      console.log('Product with the same name already exist, skipping;');
      continue;
    }
    await prisma.product.create({
      data: fixture,
    });
  }
};

export const seedTestActivities = async (prisma: PrismaClient) => {
  for (const fixture of devActivityFixtures) {
    if (
      await prisma.activity.findFirst({
        where: {
          name: fixture.name,
        },
      })
    ) {
      console.log('Activity with the same name already exist, skipping;');
      continue;
    }
    await prisma.activity.create({
      data: fixture,
    });
  }
};

export const seedDevIPs = async (prisma: PrismaClient) =>
  prisma.ip.upsert({
    where: {
      ip: '0.0.0.0/0',
    },
    create: {
      ip: '0.0.0.0/0',
      description: 'Allow all IPs',
    },
    update: {},
  });

export const devSeedProcedure = async (prisma: PrismaClient) => {
  console.log('Seeding development data');
  const roles = await prisma.role.findMany({
    select: {
      id: true,
    },
  });

  await prisma.staff.upsert({
    where: {
      email: 'test@konomi.ai',
    },
    create: await seedSuperUser(roles.map((r) => r.id)),
    // Don't update
    update: {},
  });
  await seedDevIPs(prisma);
  try {
    await seedTestCustomers(prisma);
  } catch (e) {
    console.log(`Customer seed experienced failure: ${JSON.stringify(e)}`);
  }
  await seedTestForms(prisma);
  await seedTestProducts(prisma);
  await seedTestActivities(prisma);
  console.log('Development data seeding complete');
};
