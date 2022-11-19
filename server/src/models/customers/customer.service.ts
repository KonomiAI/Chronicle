import { Injectable } from '@nestjs/common';
import { Gender, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  listCustomers(args?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
    select?: Prisma.CustomerSelect;
  }) {
    return this.prisma.customer.findMany({
      ...(args ?? {}),
      where: {
        isDeleted: false,
        ...(args?.where ?? {}),
      },
    });
  }

  findCustomer({ select, id }: { id: string; select?: Prisma.CustomerSelect }) {
    return this.prisma.customer.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      select,
    });
  }

  createCustomer({ data }: { data: Prisma.CustomerCreateInput }) {
    return this.prisma.customer.create({ data });
  }

  updateCustomer({
    data,
    id,
  }: {
    data: Prisma.CustomerUpdateInput;
    id: string;
  }) {
    return this.prisma.customer.update({ data, where: { id } });
  }

  async deleteCustomer({ id }: { id: string }) {
    // Wipe personal information
    await this.prisma.customer.update({
      where: { id },
      data: {
        firstName: 'Deleted',
        lastName: 'Deleted',
        email: `deleted.${randomUUID()}@konomi.ai`,
        gender: Gender.NOT_SPECIFIED,
        phone: null,
        isDeleted: true,
      },
    });
    // Delete all responses created for the user
    await this.prisma.response.deleteMany({ where: { customerId: id } });
    return true;
  }
}
