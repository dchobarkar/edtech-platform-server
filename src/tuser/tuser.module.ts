import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuserController } from './tuser.controller';
import { TuserService } from './tuser.service';
import { TuserRepository } from '../repository/tuser.repository';

import { AuthModule } from '../auth/auth.module';
import { AwsHelper } from 'src/utils/AwsHelper';

@Module({
  imports: [TypeOrmModule.forFeature([TuserRepository]), AuthModule],
  controllers: [TuserController],
  providers: [TuserService, AwsHelper],
})
export class TuserModule {}
