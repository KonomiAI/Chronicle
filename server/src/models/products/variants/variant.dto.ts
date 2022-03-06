import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  barcode: string;
}

export class UpdateVariantDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
