import { Injectable } from '@nestjs/common';
import { Prisma, Staff } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IPService {
  constructor(private prisma: PrismaService) {}

  async retrieveIPAllowList(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IpWhereUniqueInput;
    where?: Prisma.IpWhereInput;
    orderBy?: Prisma.IpOrderByWithRelationInput;
  }){
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ip.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

 async add(data: Prisma.IpCreateInput) {
  return this.prisma.ip.create({
    data,
    select: {
      ip: true,
      description: true,
    }
  })
 }
}
