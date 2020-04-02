import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  IsNumberString,
} from 'class-validator';

export class CreateTuserDto {
  @IsString()
  classintro: string;

  @IsString()
  address: string;

  @IsString()
  @MaxLength(50)
  city: string;

  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  pincode: string;

  @IsUrl()
  bannerimgurl: string;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  state_id: number;
}
