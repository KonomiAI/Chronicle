import { PrismaClient } from '@prisma/client';
import { COMMON_ROLE_FIXTURES } from './fixtures/common/roles';

const seedCommonRoles = async (prisma: PrismaClient) => {
  const fixtures = COMMON_ROLE_FIXTURES;
  for (const fixture of fixtures) {
    await prisma.role.upsert({
      where: {
        name: fixture.name,
      },
      create: fixture,
      update: {},
    });
  }
};

const seedCommonPermissions = async (prisma: PrismaClient) => {
  const permissions = ['Inventory', 'Security', 'Customer', 'Entry', 'Form'];
  for (const permission of permissions) {
    await prisma.feature.upsert({
      where: { name: permission },
      update: {},
      create: {
        name: permission,
      },
    });
  }
};

export const commonSeedProcedure = async (prisma: PrismaClient) => {
  await seedCommonPermissions(prisma);
  await seedCommonRoles(prisma);
};
