import {
  IsEmail,
  Matches,
  IsNumberString,
  IsAlpha,
  MinLength,
  MaxLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsAlpha()
  @MaxLength(50)
  firstname: string;

  @IsAlpha()
  @MaxLength(50)
  lastname: string;

  @MinLength(1)
  @MaxLength(100)
  classname: string;

  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  mobile: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
