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
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // Create new user
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }

  // Login user
  async logIn(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    // Get id of the user
    const id = await this.userRepository.validateuserpassword(authLoginDto);

    // If no id present, its a invalid login attempt
    if (!id) {
      throw new UnauthorizedException('Email or Password is wrong.');
    }

    // Send accessToken
    const payLoad: JwtPayload = { id };
    const accessToken = this.jwtService.sign(payLoad);
    return { accessToken };
  }
}
