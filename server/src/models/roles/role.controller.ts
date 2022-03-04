import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete
} from '@nestjs/common';
import { Role as RoleModel } from '@prisma/client';
import { RoleService } from './role.service';
import { RoleDto, UpdateRoleDto } from './role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  async getRoles(): Promise<RoleModel[]> {
    return this.roleService.findAll({});
  }

  @Post()
  async createRole(@Body() { ...data }: RoleDto) {
    return this.roleService.createRole(data);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() data: UpdateRoleDto,
  ) {
    return this.roleService.updateRole({ where: { id }, data });
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: string) {
    // TODO: logic for checking if role is currently active on any staff (delayed until the relation with staff is created)
    return this.roleService.deleteRole({ id });
  }
}
