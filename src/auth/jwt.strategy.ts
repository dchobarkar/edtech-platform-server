import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

import { JwtPayload } from './jwt-payload.interface';

// Get env values
const JWT_CONFIG = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONFIG.secret,
    });
  }

  // Validate jwt token sent from client
  async validate(payLoad: JwtPayload): Promise<UserEntity> {
    const { id } = payLoad;
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
