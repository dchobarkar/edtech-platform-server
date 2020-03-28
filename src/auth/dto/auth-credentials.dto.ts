import {
  IsEmail,
  Matches,
  IsString,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Length(1, 50)
  firstname: string;

  @IsString()
  @Length(1, 50)
  lastname: string;

  @IsString()
  @Length(1, 100)
  classname: string;

  @IsPhoneNumber('IN')
  mobile: number;

  @Length(1, 50)
  @IsEmail()
  email: string;

  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
