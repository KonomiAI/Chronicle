import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/auth/bcrypt.service';
import { CreateStaffDto } from './staff.dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private service: StaffService, private bcrypt: BcryptService) {}

  @Get()
  getAllStaff() {
    return this.service.findAll({});
  }

  @Post()
  async createNewStaff(@Body() { password, ...data }: CreateStaffDto) {
    const body = {
      ...data,
      authKey: await this.bcrypt.hash(password),
    };
    return this.service.insert(body);
  }
}
