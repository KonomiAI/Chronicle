import { Injectable } from '@nestjs/common';
import { Audit, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async getAudits(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityWhereUniqueInput;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }): Promise<Audit[]> {
    return this.prisma.audit.findMany(params);
  }

  async createAudit(data: Prisma.AuditCreateInput) {
    return this.prisma.audit.create({ data });
  }
}
