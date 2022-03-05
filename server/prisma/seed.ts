import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const permissions = ['Inventory', 'Security', 'Customer', 'Entry', 'Form'];
  for (var permission of permissions) {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
