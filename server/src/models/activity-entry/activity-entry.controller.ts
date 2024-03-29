import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma, Staff } from '@prisma/client';

import { Auditable } from 'src/auth/audit.decorator';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { GetUser } from 'src/auth/user.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { PrismaService } from 'src/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
import { ActivityEntryChargeDto, ActivityEntryDto } from './activity-entry.dto';
import { ActivityEntryService } from './activity-entry.service';

const DEFAULT_ENTRY_SELECT = {
  id: true,
  customer: true,
  activity: true,
  products: {
    select: {
      id: true,
      description: true,
      isAvailable: true,
      price: true,
      barcode: true,
      createdAt: true,
      updatedAt: true,
      isArchived: true,
      product: {
        select: {
          id: true,
          brand: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          imageUrl: true,
          isArchived: true,
        },
      },
    },
  },
  responses: {
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      latestResponseVersion: {
        include: {
          respondent: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          formVersion: {
            include: {
              form: true,
            },
          },
        },
      },
    },
  },
  createdAt: true,
  updatedAt: true,
  author: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
  charge: {
    select: {
      amount: true,
      id: true,
      description: true,
      createdDt: true,
    },
  },
  tipCharged: true,
};

@Controller('activity-entry')
@UseInterceptors(TransformInterceptor)
export class ActivityEntryController {
  constructor(
    private service: ActivityEntryService,
    private readonly ledger: LedgerService,
    private readonly prisma: PrismaService,
  ) {}
  @Auth(Actions.READ, [Features.Entry])
  @Get()
  getActivityEntries() {
    return this.service.getActivityEntries({
      select: DEFAULT_ENTRY_SELECT,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Auth(Actions.READ, [Features.Entry])
  @Get('my')
  getMyActivityEntries(@Request() { user }) {
    if (!user) {
      throw new BadRequestException(
        'User must be logged in to see their own activity entries',
      );
    }
    return this.service.getActivityEntries({
      select: DEFAULT_ENTRY_SELECT,
      where: {
        staffId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Auth(Actions.READ, [Features.Entry])
  @Get(':id')
  getActivityEntryById(@Param('id') id: string) {
    return this.service.getActivityEntryById(id, DEFAULT_ENTRY_SELECT);
  }

  @Auth(Actions.WRITE, [Features.Entry])
  @Post()
  @Auditable()
  createActivityEntry(@Body() body: ActivityEntryDto, @Request() { user }) {
    return this.service.createActivityEntry({
      author: {
        connect: {
          id: user.id,
        },
      },
      customer: {
        connect: {
          id: body.customerId,
        },
      },
      ...(body.activityId
        ? {
            activity: {
              connect: {
                id: body.activityId,
              },
            },
          }
        : {}),
      ...(body.variantId
        ? {
            variantId: body.variantId,
          }
        : {}),
    });
  }

  @Auth(Actions.WRITE, [Features.Entry])
  @Put(':id')
  @Auditable()
  updateActivityEntry(
    @Param('id') id: string,
    @Body() { responseIds, variantId, ...body }: ActivityEntryDto,
  ) {
    const updateData: Prisma.ActivityEntryUncheckedUpdateInput = {
      ...body,
    };
    if (variantId) {
      updateData.products = {
        set: variantId.map((id) => ({ id })),
      };
    }
    if (responseIds) {
      updateData.responses = {
        set: responseIds.map((id) => ({ id })),
      };
    }
    return this.service.updateActivityEntry(id, updateData);
  }

  @Auth(Actions.WRITE, [Features.Entry])
  @Get(':id/charge')
  async getChargeDetailsOfActivityEntry(@Param('id') id: string) {
    const entry = await this.getActivityEntryById(id);
    if (!entry) {
      throw new NotFoundException('Entry request is not found');
    }
    if (await this.ledger.getChargeByEntryId(id)) {
      throw new BadRequestException('Entry already charged');
    }
    const customerBalance = await this.ledger.getCustomerBalance(
      entry.customer.id,
    );
    const amount =
      (entry.activity?.price ?? 0) +
      (entry.products?.reduce((acc, p) => acc + p.price, 0) ?? 0);
    return {
      balance: customerBalance.balance,
      amount,
      // Positive amount means customer has to pay
      // Negative amount means customer has to be refunded (or has on account)
      remaining: customerBalance.balance + amount,
    };
  }

  @Auth(Actions.WRITE, [Features.Entry])
  @Post(':id/charge')
  @Auditable()
  async chargeActivityEntry(
    @Param('id') id: string,
    @Body() { description, tipAmount }: ActivityEntryChargeDto,
    @GetUser() user: Staff,
  ) {
    if (await this.ledger.getChargeByEntryId(id)) {
      throw new BadRequestException('Entry already charged');
    }
    const entry = await this.getActivityEntryById(id);
    const amount =
      (entry.activity?.price ?? 0) +
      (entry.products?.reduce((acc, p) => acc + p.price, 0) ?? 0) +
      (tipAmount ?? 0);

    const [charge] = await this.prisma.$transaction([
      this.prisma.ledger.create({
        data: {
          customer: {
            connect: {
              id: entry.customer.id,
            },
          },
          amount,
          createdBy: {
            connect: {
              id: user.id,
            },
          },
          description,
          activityEntry: {
            connect: {
              id,
            },
          },
        },
      }),
      this.service.updateActivityEntry(id, {
        tipCharged: tipAmount ?? 0,
      }),
    ]);
    return charge;
  }
}
