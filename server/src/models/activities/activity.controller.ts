import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Activity as ActivityModel } from '@prisma/client';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';

import { ActivityService } from './activity.service';

@Controller('activities')
@UseInterceptors(TransformInterceptor)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Auth(Actions.READ, [Features.Inventory])
  @Get()
  async getActivities(): Promise<ActivityModel[]> {
    return this.activityService.activities({});
  }

  @Auth(Actions.READ, [Features.Inventory])
  @Get(':id')
  async getActivityById(@Param('id') id: string): Promise<ActivityModel> {
    return this.activityService.activity({ id });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Post()
  async createActivity(
    @Body() activityData: { name: string; price: string; isArchived?: boolean },
  ): Promise<ActivityModel> {
    const { name, price, isArchived } = activityData;
    return this.activityService.createActivity({
      name,
      price: +price,
      isArchived,
    });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Put(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body()
    activityData: {
      name?: string;
      price?: string;
      isArchived?: boolean;
    },
  ): Promise<ActivityModel> {
    const { name, price, isArchived } = activityData;
    return this.activityService.updateActivity({
      where: { id },
      data: { name, price: +price, isArchived },
    });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Delete(':id')
  async deleteActivity(@Param('id') id: string): Promise<ActivityModel> {
    return this.activityService.deleteActivity({ id });
  }
}
