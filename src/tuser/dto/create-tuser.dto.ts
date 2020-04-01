import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsUrl,
  IsMobilePhone,
  MaxLength,
  Length,
  IsInt,
} from 'class-validator';
import { Index } from 'typeorm';

export class CreateTuserDto {
  // @IsString()
  classintro: string;

  // @IsNotEmpty()
  // @IsString()
  // @MaxLength(90)
  address: string;

  // @IsNotEmpty()
  // @IsString()
  // @MaxLength(50)
  city: string;

  // @IsNotEmpty()
  pincode: number;

  // @IsString()
  // @IsUrl()
  bannerimgurl: string;

  // @IsNotEmpty()
  // @IsInt()
  // @Min(0)
  // @Max(195)
  country_id;

  // @IsNotEmpty()
  // @IsInt()
  // @Min(0)
  // @Max(195)
  state_id;
}
