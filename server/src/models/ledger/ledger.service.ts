import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  async createCharge(data: Prisma.LedgerCreateInput) {
    return this.prisma.ledger.create({ data });
  }

  async getChargeById(id: string) {
    return this.prisma.ledger.findFirst({ where: { id } });
  }

  async getChargeByEntryId(entryId: string) {
    return this.prisma.ledger.findFirst({
      where: {
        activityEntryId: entryId,
      },
    });
  }

  async getCharges(args?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LedgerWhereUniqueInput;
    where?: Prisma.LedgerWhereInput;
    orderBy?: Prisma.LedgerOrderByWithRelationInput;
  }) {
    return this.prisma.ledger.findMany(args);
  }

  async getCustomerBalance(customerId: string) {
    const charges = await this.prisma.ledger.findMany({
      where: {
        customerId,
      },
      select: {
        amount: true,
        id: true,
        description: true,
        createdDt: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        activityEntry: {
          select: {
            id: true,
          },
        },
      },
    });
    const balance = charges.reduce((acc, charge) => acc + charge.amount, 0);
    return { balance, charges };
  }
}
