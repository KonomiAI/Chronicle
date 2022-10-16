import { Injectable } from '@nestjs/common';
import { Prisma, Ip as IPModel } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import * as CIDRMatcher from 'cidr-matcher';

@Injectable()
export class IPService {
  constructor(private prisma: PrismaService) {}

  async allowList(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityWhereUniqueInput;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }): Promise<IPModel[]> {
    return this.prisma.ip.findMany(params);
  }

  async addIP(data: Prisma.IpCreateInput): Promise<IPModel> {
    return this.prisma.ip.create({
      data,
    });
  }

  async updateIPDescription(params: {
    where: Prisma.IpWhereUniqueInput;
    data: Prisma.IpUpdateInput;
  }): Promise<IPModel> {
    const { where, data } = params;
    return this.prisma.ip.update({
      where,
      data,
    });
  }

  async deleteIP(where: Prisma.ActivityWhereUniqueInput): Promise<IPModel> {
    return this.prisma.ip.delete({
      where,
    });
  }

  async isIPInAllowList(ip: string) {
    const res = await this.prisma.ip.findMany();
    const ips = res.map((ip) => ip.ip);
    const matcher = new CIDRMatcher(ips);
    return matcher.contains(ip);
  }
}
