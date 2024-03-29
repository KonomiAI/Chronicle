import { Gender } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CustomerDto {
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
  @IsNotEmpty()
  dateOfBirth: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsOptional()
  phone: string;

  @IsOptional()
  @IsArray()
  responseIds: string[];
}

export class CustomerChargeDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;
}
