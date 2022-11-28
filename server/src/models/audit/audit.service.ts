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
    return this.prisma.audit.findMany({
      ...params,
      include: {
        createdBy: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async createAudit(data: Prisma.AuditCreateInput) {
    return this.prisma.audit.create({ data });
  }
}
