import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepository } from './repository/lecture.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LectureRepository])],
  controllers: [LectureController],
  providers: [LectureService],
})
export class LectureModule {}
