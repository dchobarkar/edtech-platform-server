import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;
}
