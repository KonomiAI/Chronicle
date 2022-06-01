import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { BcryptService } from '../../auth/bcrypt.service';
import { CreateStaffDto, UpdateStaffDto } from './staff.dto';
import { StaffService } from './staff.service';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';

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
@UseInterceptors(TransformInterceptor)
export class StaffController {
  constructor(private service: StaffService, private bcrypt: BcryptService) {}

  @Auth(Actions.READ, [Features.Security])
  @Get()
  async getAllStaff() {
    const data = await this.service.findAll({ select: DEFAULT_SELECT });
    return { data };
  }

  @Auth(Actions.READ, [Features.Security])
  @Get(':id')
  getSingleStaff(@Param('id') id: string) {
    return this.service.findOne(
      {
        id,
      },
      DEFAULT_SELECT,
    );
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Post()
  async createNewStaff(@Body() { password, ...data }: CreateStaffDto) {
    const body = {
      ...data,
      authKey: await this.bcrypt.hash(password),
    };
    return this.service.insert(body);
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Put(':id')
  async updateStaffDetails(
    @Param('id') id: string,
    @Body() data: UpdateStaffDto,
  ) {
    return this.service.update({ where: { id }, data, select: DEFAULT_SELECT });
  }

  @Auth(Actions.WRITE, [Features.Security])
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
