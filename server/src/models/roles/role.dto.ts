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
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    read: string;

    @IsNotEmpty()
    @IsBoolean()
    write: string;
}

export class PermissionMapDto {
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => PermissionDto)
    permissions: Map<string, PermissionDto>
}

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => PermissionMapDto['permissions'])
    permissions!: Prisma.JsonObject
}

export class UpdateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => PermissionMapDto['permissions'])
    permissions!: Prisma.JsonObject
}
