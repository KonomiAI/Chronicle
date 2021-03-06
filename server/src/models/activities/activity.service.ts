import { Injectable } from '@nestjs/common';
import { Activity, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async activity(
    userWhereUniqueInput: Prisma.ActivityWhereUniqueInput,
  ): Promise<Activity | null> {
    return this.prisma.activity.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async activities(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityWhereUniqueInput;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }): Promise<Activity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.activity.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createActivity(data: Prisma.ActivityCreateInput): Promise<Activity> {
    return this.prisma.activity.create({
      data,
    });
  }

  async updateActivity(params: {
    where: Prisma.ActivityWhereUniqueInput;
    data: Prisma.ActivityUpdateInput;
  }): Promise<Activity> {
    const { where, data } = params;
    return this.prisma.activity.update({
      data,
      where,
    });
  }

  async deleteActivity(
    where: Prisma.ActivityWhereUniqueInput,
  ): Promise<Activity> {
    return this.prisma.activity.delete({
      where,
    });
  }
}
