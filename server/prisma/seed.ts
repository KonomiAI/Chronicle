import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

const prisma = new PrismaClient();

async function main() {
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

  await prisma.role.createMany({
    data: [
      {
        name: 'Admin',
        permissions: {
          Inventory: {
            read: true,
            write: true,
          },
          Security: {
            read: true,
            write: true,
          },
          Customer: {
            read: true,
            write: true,
          },
          Entry: {
            read: true,
            write: true,
          },
          Form: {
            read: true,
            write: true,
          },
        },
      },
      {
        name: 'Receptionist',
        permissions: {
          Inventory: {
            read: true,
            write: false,
          },
          Security: {
            read: false,
            write: false,
          },
          Customer: {
            read: true,
            write: true,
          },
          Entry: {
            read: true,
            write: false,
          },
          Form: {
            read: true,
            write: false,
          },
        },
      },
    ],
  });

  const roles = await prisma.role.findMany({
    select: {
      id: true,
    },
  });

  await prisma.staff.create({
    data: await seedSuperUser(roles.map((r) => r.id)),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
