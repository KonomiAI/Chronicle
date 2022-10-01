import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ActivityEntryDto } from './activity-entry.dto';
import { ActivityEntryService } from './activity-entry.service';

const DEFAULT_ENTRY_SELECT: Prisma.ActivityEntrySelect = {
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
};

@Controller('activity-entry')
@UseInterceptors(TransformInterceptor)
export class ActivityEntryController {
  constructor(private service: ActivityEntryService) {}
  @Auth(Actions.READ, [Features.Entry])
  @Get()
  getActivityEntries() {
    return this.service.getActivityEntries({
      select: DEFAULT_ENTRY_SELECT,
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
    });
  }

  @Auth(Actions.READ, [Features.Entry])
  @Get(':id')
  getActivityEntryById(@Param('id') id: string) {
    return this.service.getActivityEntryById(id, DEFAULT_ENTRY_SELECT);
  }

  @Auth(Actions.WRITE, [Features.Entry])
  @Post()
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
  updateActivityEntry(
    @Param('id') id: string,
    @Body() { responseIds, ...body }: ActivityEntryDto,
    @Request() { user },
  ) {
    const updateData: Prisma.ActivityEntryUncheckedUpdateInput = {
      ...body,
      staffId: user.id,
    };
    if (responseIds) {
      updateData.responses = {
        connect: responseIds.map((id) => ({ id })),
      };
    }
    return this.service.updateActivityEntry(id, updateData);
  }
}
