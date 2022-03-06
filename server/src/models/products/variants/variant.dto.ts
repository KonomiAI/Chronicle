import {
  IsBoolean,
  IsCurrency,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsCurrency()
  price: string;

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
