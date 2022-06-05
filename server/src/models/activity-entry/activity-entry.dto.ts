import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActivityEntryDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  variantId?: string[];

  @IsString()
  @IsNotEmpty()
  activityId?: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  responseIds?: string[];
}
