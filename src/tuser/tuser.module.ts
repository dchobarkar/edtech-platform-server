import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { TuserController } from './tuser.controller';
import { TuserService } from './tuser.service';
import { TuserRepository } from './tuser.repository';

import { AwsHelper } from 'src/utils/AwsHelper';

@Module({
  imports: [TypeOrmModule.forFeature([TuserRepository]), AuthModule],
  controllers: [TuserController],
  providers: [TuserService, AwsHelper],
})
export class TuserModule {}
