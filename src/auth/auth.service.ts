import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
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

  async LogIn(authlogindto: AuthLoginDto): Promise<{ accessToken: string }> {
    const userid = await this.userrepository.validateUserPassword(authlogindto);
    if (!userid) {
      throw new UnauthorizedException('Email or Password is wrong.');
    }
    const payload: JwtPayload = { userid };
    const accessToken = await this.jwtservice.sign(payload);
    return { accessToken };
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userrepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }
}
