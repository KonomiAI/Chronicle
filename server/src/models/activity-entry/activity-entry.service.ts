import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ActivityEntryService {
  constructor(private prisma: PrismaService) {}

  getActivityEntries(args?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityEntryWhereUniqueInput;
    where?: Prisma.ActivityEntryWhereInput;
    orderBy?: Prisma.ActivityEntryOrderByWithRelationInput;
    select?: Prisma.ActivityEntrySelect;
  }) {
    return this.prisma.activityEntry.findMany(args);
  }

  getActivityEntryById(id: string, select?: Prisma.ActivityEntrySelect) {
    return this.prisma.activityEntry.findFirst({
      where: {
        id,
      },
      select,
    });
  }

  createActivityEntry(data: Prisma.ActivityEntryCreateInput) {
    return this.prisma.activityEntry.create({ data });
  }

  updateActivityEntry(
    id: string,
    data: Prisma.ActivityEntryUncheckedUpdateInput,
  ) {
    return this.prisma.activityEntry.update({
      where: {
        id,
      },
      data,
    });
  }
}
