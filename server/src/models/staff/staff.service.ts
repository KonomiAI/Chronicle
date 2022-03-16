import { Injectable } from '@nestjs/common';
import { Prisma, Staff } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StaffWhereUniqueInput;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput;
    select: Prisma.StaffSelect;
  }) {
    return this.prisma.staff.findMany(params);
  }

  async findOne(
    userWhereUniqueInput: Prisma.StaffWhereUniqueInput,
    select?: Prisma.StaffSelect,
  ): Promise<Partial<Staff> | null> {
    return this.prisma.staff.findUnique({
      where: userWhereUniqueInput,
      select,
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

  async update(params: {
    where: Prisma.StaffWhereUniqueInput;
    data: Prisma.StaffUpdateInput;
    select?: Prisma.StaffSelect;
  }) {
    return this.prisma.staff.update(params);
  }
}
