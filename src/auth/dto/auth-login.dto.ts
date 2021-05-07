import { IsEmail, MaxLength, MinLength, Matches } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
