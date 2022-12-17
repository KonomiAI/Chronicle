import { IsEnum, IsISO8601, IsMongoId, IsOptional } from 'class-validator';

export type VisitStatus = 'open' | 'closed';

export class FilterVisitDto {
  @IsOptional()
  @IsMongoId()
  customerId?: string;

  @IsISO8601()
  @IsOptional()
  visitDate?: string;

  @IsOptional()
  @IsEnum(['open', 'closed'])
  status?: VisitStatus;
}
