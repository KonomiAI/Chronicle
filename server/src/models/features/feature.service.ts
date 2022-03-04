import { Injectable } from '@nestjs/common';
import { Feature, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class FeatureService {
    constructor(private prisma: PrismaService) { }

    async features(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.FeatureWhereUniqueInput;
        where?: Prisma.FeatureWhereInput;
        orderBy?: Prisma.FeatureOrderByWithRelationInput;
    }): Promise<Feature[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.feature.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }
}
