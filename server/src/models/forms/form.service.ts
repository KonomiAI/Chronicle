import { Injectable } from '@nestjs/common';
import { Form, FormVersion, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}

  async forms(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FormWhereUniqueInput;
    where?: Prisma.FormWhereInput;
    orderBy?: Prisma.FormOrderByWithRelationInput;
    select: Prisma.FormSelect;
  }) {
    return this.prisma.form.findMany(params);
  }

  async form(
    userWhereUniqueInput: Prisma.FormWhereUniqueInput,
    select?: Prisma.FormSelect,
  ): Promise<Partial<Form> | null> {
    return this.prisma.form.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async formVersion(
    userWhereUniqueInput: Prisma.FormVersionWhereUniqueInput,
    select?: Prisma.FormVersionSelect,
  ): Promise<Partial<FormVersion> | null> {
    return this.prisma.formVersion.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async createForm(
    data: Prisma.FormCreateInput,
    select?: Prisma.FormSelect,
  ): Promise<Partial<Form>> {
    return this.prisma.form.create({
      data,
      select: select,
    });
  }

  async attachVersion(
    formId: string,
    body: object,
    select?: Prisma.FormSelect,
  ): Promise<Partial<Form>> {
    const formVersion = await this.prisma.formVersion.create({
      data: {
        formId: formId,
        body: body,
      },
    });
    return this.prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        latestFormId: formVersion.id,
      },
      select: select,
    });
  }

  async updateForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
    select?: Prisma.FormSelect;
  }) {
    return this.prisma.form.update(params);
  }
}
