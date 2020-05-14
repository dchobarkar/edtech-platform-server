import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserRepository } from './user.repository';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userrepository: UserRepository,
    private jwtservice: JwtService,
  ) {}

  async signUp(authcredentialsdto: AuthCredentialsDto): Promise<void> {
    return this.userrepository.signup(authcredentialsdto);
  }

  async logIn(authlogindto: AuthLoginDto): Promise<{ accessToken: string }> {
    const userid = await this.userrepository.validateuserpassword(authlogindto);
    if (!userid) {
      throw new UnauthorizedException('Email or Password is wrong.');
    }
    const payload: JwtPayload = { userid };
    const accessToken = this.jwtservice.sign(payload);
    return { accessToken };
  }
}
