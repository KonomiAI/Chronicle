import { IsISO8601, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  @IsMongoId()
  customerId: string;

  @IsISO8601()
  @IsOptional()
  visitDate?: string;
}
