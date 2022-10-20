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
}
