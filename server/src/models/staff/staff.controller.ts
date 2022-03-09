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
import { BcryptService } from 'src/auth/bcrypt.service';
import { CreateStaffDto, UpdateStaffDto } from './staff.dto';
import { StaffService } from './staff.service';

const DEFAULT_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  gender: true,
  dateOfBirth: true,
  isSuperUser: true,
  isSuspended: true,
  roles: {
    select: {
      id: true,
      name: true,
      permissions: true,
    },
  },
  roleIds: true,
};

@Controller('staff')
export class StaffController {
  constructor(private service: StaffService, private bcrypt: BcryptService) {}

  @Get()
  async getAllStaff() {
    const data = await this.service.findAll({ select: DEFAULT_SELECT });
    return { data };
  }

  @Get(':id')
  getSingleStaff(@Param('id') id: string) {
    return this.service.findOne(
      {
        id,
      },
      DEFAULT_SELECT,
    );
  }

  @Post()
  async createNewStaff(@Body() { password, ...data }: CreateStaffDto) {
    const body = {
      ...data,
      authKey: await this.bcrypt.hash(password),
    };
    return this.service.insert(body);
  }

  @Put(':id')
  async updateStaffDetails(
    @Param('id') id: string,
    @Body() data: UpdateStaffDto,
  ) {
    return this.service.update({ where: { id }, data, select: DEFAULT_SELECT });
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: string) {
    const data = await this.service.findOne(
      { id },
      { isSuspended: true, isSuperUser: true },
    );
    if (!data.isSuspended || data.isSuperUser) {
      throw new BadRequestException(
        'User is not yet suspended or is a super user and cannot be deleted.',
      );
    }
    return this.service.update({
      where: { id },
      data: {
        firstName: 'DELETED_STAFF',
        lastName: 'DELETED_STAFF',
        dateOfBirth: null,
        gender: 'NOT_SPECIFIED',
        isDeleted: true,
      },
    });
  }
}
