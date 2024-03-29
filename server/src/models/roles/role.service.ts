import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.RoleWhereUniqueInput,
    select?: Prisma.RoleSelect,
  ) {
    return this.prisma.role.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { where, data } = params;
    return this.prisma.role.update({
      data,
      where,
    });
  }

  async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    const roleStaffInfo = await this.prisma.role.findFirst({
      where,
      select: {
        staff: true,
      },
    });
    if (!roleStaffInfo) {
      throw new NotFoundException('Role not found');
    }
    if (roleStaffInfo?.staff.length) {
      throw new BadRequestException(
        'Cannot delete role that is currently assigned to staff',
      );
    }
    return this.prisma.role.delete({
      where,
    });
  }
}
