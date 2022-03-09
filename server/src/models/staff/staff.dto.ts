import { Gender } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStaffDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
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

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isSuspended: boolean;

  @IsString({
    each: true,
  })
  roleIds: string[];
}
