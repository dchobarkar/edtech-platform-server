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
  // Create new user
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {
      firstName,
      lastName,
      className,
      mobileNo,
      email,
      password,
    } = authCredentialsDto;
    const newUser = new UserEntity();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.className = className;
    newUser.mobileNo = mobileNo;
    newUser.email = email;

    // Create a salt (random) value and use it along password to create a hash value
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Mobile No. or Email id already exists.');
      } else {
        console.log(`Error in signup\n${authCredentialsDto}\n${error}`);
        throw new InternalServerErrorException();
      }
    }
  }

  // Validate password against the email
  async validateuserpassword(authLoginDto: AuthLoginDto): Promise<string> {
    const { email, password } = authLoginDto;

    // Return id if the credentials are correct for given email.
    // Else return null.
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user.id;
    } else {
      return null;
    }
  }

  // Return a hash value from password and salt string.
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
