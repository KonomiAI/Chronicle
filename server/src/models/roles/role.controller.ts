import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Role as RoleModel } from '@prisma/client';

import { RoleService } from './role.service';
import { RoleDto, UpdateRoleDto } from './role.dto';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';
import { Auditable } from 'src/auth/audit.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth(Actions.READ, [Features.Security])
  @Get()
  async getRoles(): Promise<RoleModel[]> {
    return this.roleService.findAll({});
  }

  @Auth(Actions.READ, [Features.Security])
  @Get(':id')
  getRole(@Param('id') id: string) {
    return this.roleService.findOne(
      { id },
      {
        id: true,
        name: true,
        permissions: true,
        staff: {
          select: {
            id: true,
          },
        },
      },
    );
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Post()
  @Auditable()
  async createRole(@Body() { ...data }: RoleDto) {
    return this.roleService.createRole(data);
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Put(':id')
  @Auditable()
  async updateRole(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.updateRole({ where: { id }, data });
  }

  @Auth(Actions.WRITE, [Features.Security])
  @Delete(':id')
  @Auditable()
  async deleteRole(@Param('id') id: string) {
    // TODO: logic for checking if role is currently active on any staff (delayed until the relation with staff is created)

    return this.roleService.deleteRole({ id });
  }
}
