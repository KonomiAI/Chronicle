import { Gender } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString({
    each: true,
  })
  roleIds: string[];

  @IsISO8601()
  @IsOptional()
  dateOfBirth: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;
}

export class UpdateStaffDto {
  @IsOptional()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsISO8601()
  @IsOptional()
  dateOfBirth: string;

  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isSuspended: boolean;

  @IsString({
    each: true,
  })
  roleIds: string[];
}
