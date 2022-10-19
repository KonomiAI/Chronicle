import { IsInt, IsOptional, IsString } from 'class-validator';

export class ActivityDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsInt()
  price: number;
}
