import {
  IsNotEmpty,
  IsString,
  IsIP,
} from 'class-validator';

export class AddIPDto {
  @IsIP()
  @IsNotEmpty()
  ip: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateIPDescriptionDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}