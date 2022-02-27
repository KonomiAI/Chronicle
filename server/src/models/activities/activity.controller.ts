import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Activity as ActivityModel } from '@prisma/client';

import { ActivityService } from './activity.service';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('activities')
  async getActivities(): Promise<ActivityModel[]> {
    return this.activityService.activities({});
  }

  @Get('activities/:id')
  async getActivityById(@Param('id') id: string): Promise<ActivityModel> {
    return this.activityService.activity({ id });
  }

  @Post('activities')
  async createActivity(
    @Body() activityData: { name: string; price: string; isArchived?: boolean },
  ): Promise<ActivityModel> {
    const { name, price, isArchived } = activityData;
    return this.activityService.createActivity({
      name,
      price,
      isArchived,
    });
  }

  @Patch('activities/:id')
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
      data: { name, price, isArchived },
    });
  }

  @Delete('activities/:id')
  async deleteActivity(@Param('id') id: string): Promise<ActivityModel> {
    return this.activityService.deleteActivity({ id });
  }
}
