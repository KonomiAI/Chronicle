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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
