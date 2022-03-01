import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StaffWhereUniqueInput;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput;
  }) {
    return this.prisma.staff.findMany({
      ...params,
      select: {
        // TODO ignore hash key from this object
      },
    });
  }

  async insert(data: Prisma.StaffCreateInput) {
    return this.prisma.staff.create({
      data,
      select: {
        email: true,
        id: true,
        firstName: true,
        lastName: true,
      },
    });
  }
}
