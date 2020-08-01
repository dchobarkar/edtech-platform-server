import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userrepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { id } = payload;
    const user = await this.userrepository.findOne({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
