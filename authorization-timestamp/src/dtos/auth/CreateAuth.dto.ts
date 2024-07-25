import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsBoolean()
  isExpired?: boolean;

  @IsNotEmpty()
  @IsDate()
  expiredAt: Date;
}
