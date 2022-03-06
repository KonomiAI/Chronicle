import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IPService } from './ip.service';

@Controller('ip')
export class IPController {
  constructor(private service: IPService) {}

  @Get()
  getIPAllowList(){
    return this.service.retrieveIPAllowList({});
  }

  @Post()
  async addIPToAllowList(
    @Body() ipData: { ip: string, description: string } 
  ) {
    return this.service.add;
  }

}
