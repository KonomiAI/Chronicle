import { Prisma, Role } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  read: boolean;

  @IsNotEmpty()
  @IsBoolean()
  write: boolean;
}

export class PermissionMapDto {
  @ValidateNested()
  @Type(() => PermissionDto)
  Inventory: PermissionDto;

  @ValidateNested()
  @Type(() => PermissionDto)
  Security: PermissionDto;

  @ValidateNested()
  @Type(() => PermissionDto)
  Customer: PermissionDto;

  @ValidateNested()
  @Type(() => PermissionDto)
  Entry: PermissionDto;

  @ValidateNested()
  @Type(() => PermissionDto)
  Form: PermissionDto;
}

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionMapDto)
  permissions: Prisma.JsonObject;
}

export class UpdateRoleDto {
  name: string;

  @ValidateNested()
  @Type(() => PermissionMapDto)
  permissions: Prisma.JsonObject;
}
