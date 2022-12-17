import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsMongoId } from 'class-validator';
import { CreateVisitDto } from './create-visit.dto';

export class UpdateVisitDto extends PartialType(CreateVisitDto) {
  @IsArray()
  @IsMongoId({
    each: true,
  })
  activityEntryIds: string[];
}
