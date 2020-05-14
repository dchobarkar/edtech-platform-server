import {
  IsEmail,
  Matches,
  IsNumberString,
  IsAlpha,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsAlpha()
  @MaxLength(50)
  firstname: string;

  @IsAlpha()
  @MaxLength(50)
  lastname: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  @MaxLength(100)
  classname: string;

  @IsNumberString()
  @Length(10, 10)
  mobile: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
