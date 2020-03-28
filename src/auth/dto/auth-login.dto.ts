import { Length, IsEmail, Matches } from 'class-validator';

export class AuthLoginDto {
  @Length(1, 50)
  @IsEmail()
  email: string;

  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
