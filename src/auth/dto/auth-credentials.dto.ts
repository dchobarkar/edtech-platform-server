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
  firstName: string;

  @IsAlpha()
  @MaxLength(50)
  lastName: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  @MaxLength(100)
  className: string;

  @IsNumberString()
  @Length(10, 10)
  mobileNo: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
