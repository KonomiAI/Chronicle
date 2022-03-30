import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Ip as IPModel } from '@prisma/client';
import { IPService } from './ip.service';
import { IPDto } from './ip.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('ip')
@UseInterceptors(TransformInterceptor)
export class IPController {
  constructor(private service: IPService) {}

  @Get()
  getIPAllowList(): Promise<IPModel[]> {
    return this.service.allowList({});
  }

  @Post()
  async addIPToAllowList(@Body() { ip, description }: IPDto): Promise<IPModel> {
    return this.service.addIP({ ip, description });
  }

  @Put(':id')
  async updateIPDescription(
    @Param('id') id: string,
    @Body() { ip, description }: IPDto,
  ): Promise<IPModel> {
    return this.service.updateIPDescription({
      where: { id },
      data: { ip, description },
    });
  }

  @Delete(':id')
  async deleteIPfromAllowList(@Param('id') id: string): Promise<IPModel> {
    return this.service.deleteIP({ id });
  }
}
