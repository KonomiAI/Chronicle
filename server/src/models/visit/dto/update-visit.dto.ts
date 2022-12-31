import { IsArray, IsISO8601, IsMongoId } from 'class-validator';

export class UpdateVisitDto {
  @IsMongoId()
  customerId: string;

  @IsArray()
  @IsMongoId({
    each: true,
  })
  activityEntryIds: string[];

  @IsISO8601()
  visitDate: string;
}
