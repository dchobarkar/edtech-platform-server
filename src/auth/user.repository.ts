import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(authcredentialsdto: AuthCredentialsDto): Promise<void> {
    const {
      firstname,
      lastname,
      classname,
      mobile,
      email,
      password,
    } = authcredentialsdto;
    const NewUser = new UserEntity();
    NewUser.firstname = firstname;
    NewUser.lastname = lastname;
    NewUser.classname = classname;
    NewUser.mobile = mobile;
    NewUser.email = email;
    NewUser.salt = await bcrypt.genSalt();
    NewUser.password = await this.hashPassword(password, NewUser.salt);
    try {
      await NewUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Mobile No. or Email-id already exists.');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateuserpassword(authlogindto: AuthLoginDto): Promise<string> {
    const { email, password } = authlogindto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user.id;
    } else {
      return null;
    }
  }
}
