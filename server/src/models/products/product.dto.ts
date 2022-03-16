import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString({ each: true })
  imageUrl: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString({ each: true })
  imageUrl: string[];

  @IsOptional()
  @IsBoolean()
  isArchived: boolean;
}
