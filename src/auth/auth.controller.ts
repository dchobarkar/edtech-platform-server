import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authoservice: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authcredentialsdto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authoservice.signUp(authcredentialsdto);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) authlogindto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authoservice.logIn(authlogindto);
  }
}
