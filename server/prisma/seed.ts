import { PrismaClient } from '@prisma/client';
import { commonSeedProcedure } from './seed.common';
import { devSeedProcedure } from './seed.dev';

const prisma = new PrismaClient();

async function main() {
  // Run common db seed, this includes data shared between all environments
  await commonSeedProcedure(prisma);
  if (process.env.CHRONICLE_ENV === 'DEV') {
    await devSeedProcedure(prisma);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
