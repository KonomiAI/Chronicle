import {
  IsNotEmpty,
  IsString,
  IsIP,
} from 'class-validator';

export class IPDto {
  @IsIP()
  @IsNotEmpty()
  ip: string;

  @IsString()
  description: string;
}
