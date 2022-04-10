import { FormPurpose } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(FormPurpose)
  @IsOptional()
  purpose: FormPurpose;

  @IsObject()
  @IsNotEmpty()
  body: object;
}

export class UpdateFormDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(FormPurpose)
  @IsOptional()
  purpose: FormPurpose;

  @IsObject()
  @IsOptional()
  body: object;
}
