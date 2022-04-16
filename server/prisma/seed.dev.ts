import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { devCustomerFixtures } from './fixtures/dev/customers';

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
};
