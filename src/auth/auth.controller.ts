import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.logIn(authLoginDto);
  }
}
