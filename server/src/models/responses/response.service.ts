import { Injectable } from '@nestjs/common';
import { Response, ResponseVersion, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class ResponseService {
  constructor(private prisma: PrismaService) {}

  async createResponse(): Promise<Partial<Response>> {
    return this.prisma.response.create({
      select: {
        id: true,
      },
      data: {},
    });
  }

  async attachResponse(
    responseId: string,
    formVersionId: string,
    staffId: string,
    body: object,
    select?: Prisma.ResponseSelect,
  ): Promise<Partial<Response>> {
    const responseVersion = await this.prisma.responseVersion.create({
      data: {
        body,
        formVersionId,
        responseId,
        staffId,
      },
    });
    return this.prisma.response.update({
      where: {
        id: responseId,
      },
      data: {
        latestResponseVersionId: responseVersion.id,
      },
      select,
    });
  }
}
