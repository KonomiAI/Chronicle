import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  formVersionId: string;

  @IsObject()
  @IsNotEmpty()
  body: object;
}

export class UpdateResponseDto {
  @IsString()
  @IsNotEmpty()
  formVersionId: string;

  @IsObject()
  @IsNotEmpty()
  body: object;
}
