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
import { ActivityDto } from './activity.dto';

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
  async getActivityById(
    @Param('id') id: string,
  ): Promise<ActivityModel & { inUseByActivityEntry: boolean }> {
    const data = await this.activityService.activity({ id });
    const { ActivityEntry, ...rest } = data;
    return { ...rest, inUseByActivityEntry: ActivityEntry.length > 0 };
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Post()
  async createActivity(@Body() data: ActivityDto): Promise<ActivityModel> {
    return this.activityService.createActivity(data);
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Put(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body()
    data: ActivityDto,
  ): Promise<ActivityModel> {
    return this.activityService.updateActivity({
      where: { id },
      data,
    });
  }

  @Auth(Actions.WRITE, [Features.Inventory])
  @Delete(':id')
  async deleteActivity(@Param('id') id: string): Promise<ActivityModel> {
    return this.activityService.deleteActivity({ id });
  }
}
