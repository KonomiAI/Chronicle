import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { Ip as IPModel } from '@prisma/client';
import { IPService } from './ip.service';
import { AddIPDto, UpdateIPDescriptionDto } from './ip.dto';

@Controller('ip')
export class IPController {
  constructor(private service: IPService) {}

  @Get()
  getIPAllowList(): Promise<IPModel[]> {
    return this.service.allowList({});
  }

  @Post()
  async addIPToAllowList(
    @Body() { ip, description }: AddIPDto,
  ): Promise<IPModel> {
    return this.service.addIP({ ip, description });
  }

  @Patch(':id')
  async updateIPDescription(
    @Param('id') id: string,
    @Body() { description }: UpdateIPDescriptionDto,
  ): Promise<IPModel> {
    return this.service.updateIPDescription({
      where: { id },
      data: { description },
    });
  }

  @Delete(':id')
  async deleteIPfromAllowList(@Param('id') id: string): Promise<IPModel> {
    return this.service.deleteIP({ id });
  }
}
