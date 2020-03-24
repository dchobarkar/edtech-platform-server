import { Module } from '@nestjs/common';
import { TuserController } from './tuser.controller';
import { TuserService } from './tuser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TuserRepository } from './repository/tuser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TuserRepository])],
  controllers: [TuserController],
  providers: [TuserService],
})
export class TuserModule {}
