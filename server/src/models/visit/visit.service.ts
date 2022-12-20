import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { FilterVisitDto } from './dto/filter-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VISIT_SELECT } from './entities/visit.entity';

@Injectable()
export class VisitService {
  constructor(private readonly prisma: PrismaService) {}
  create({ customerId, visitDate }: CreateVisitDto, staffId: string) {
    return this.prisma.visit.create({
      data: {
        customer: {
          connect: {
            id: customerId,
          },
        },
        visitDate: visitDate ?? new Date(),
        createdBy: {
          connect: {
            id: staffId,
          },
        },
      },
    });
  }

  findAll({ customerId, status, visitDate }: FilterVisitDto) {
    const filterOptions: Prisma.VisitWhereInput = {};
    if (customerId) {
      filterOptions.customer = {
        id: customerId,
      };
    }
    if (visitDate) {
      filterOptions.visitDate = {
        equals: visitDate,
      };
    }
    if (status === 'closed') {
      filterOptions.charge = {
        some: {
          amount: {
            not: 0,
          },
        },
      };
    }
    if (status === 'open') {
      filterOptions.charge = {
        none: {
          amount: {
            not: 0,
          },
        },
      };
    }
    return this.prisma.visit.findMany({
      where: filterOptions,
      select: VISIT_SELECT,
    });
  }

  findOne(id: string) {
    return this.prisma.visit.findFirst({
      where: {
        id,
      },
      select: VISIT_SELECT,
    });
  }

  update(id: string, updateVisitDto: UpdateVisitDto) {
    const { activityEntryIds, customerId, ...cleaned } = updateVisitDto;
    return this.prisma.visit.update({
      where: {
        id,
      },
      data: {
        ...cleaned,
        activityEntries: {
          set: activityEntryIds.map((i) => ({ id: i })),
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
      },
    });
  }

  async remove(id: string) {
    if (await this.isVisitCharged(id)) {
      throw new BadRequestException(
        'Visit cannot be deleted as it has already been charged',
      );
    }
    return this.prisma.visit.delete({
      where: { id },
    });
  }

  private async isVisitCharged(id: string) {
    const { charge } = await this.prisma.visit.findFirst({
      where: { id },
      include: {
        charge: true,
      },
    });
    return !!charge.length;
  }
}
