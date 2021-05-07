import {
  MaxLength,
  IsNumberString,
  Matches,
  IsAlpha,
  Length,
} from 'class-validator';

export class CreateTuserDto {
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  classIntro: string;

  @Matches(/^[\w\s @'",/ \. \( \) ]+$/)
  address: string;

  @IsAlpha()
  @MaxLength(50)
  city: string;

  @IsNumberString()
  @Length(6, 6)
  pincode: string;

  @Matches(/[2]/)
  country_id: number;

  @Matches(/^[0 1 2 3][0-9]$/)
  state_id: number;
}
