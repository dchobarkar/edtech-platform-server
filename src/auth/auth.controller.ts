import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Delete,
  Param,
} from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

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
  LogIn(
    @Body(ValidationPipe) authlogindto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authoservice.LogIn(authlogindto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.authoservice.deleteUser(id);
  }
}
