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
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { Auditable } from 'src/audit/audit.decorator';

@Controller('ip')
@UseInterceptors(TransformInterceptor)
export class IPController {
  constructor(private service: IPService) {}

  @Auth(Actions.READ, [Features.Security])
  @Get()
  getIPAllowList(): Promise<IPModel[]> {
    return this.service.allowList({});
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Post()
  @Auditable()
  async addIPToAllowList(@Body() { ip, description }: IPDto): Promise<IPModel> {
    return this.service.addIP({ ip, description });
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Put(':id')
  @Auditable()
  async updateIPDescription(
    @Param('id') id: string,
    @Body() { ip, description }: IPDto,
  ): Promise<IPModel> {
    return this.service.updateIPDescription({
      where: { id },
      data: { ip, description },
    });
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Delete(':id')
  @Auditable()
  async deleteIPfromAllowList(@Param('id') id: string): Promise<IPModel> {
    return this.service.deleteIP({ id });
  }
}
