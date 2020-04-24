import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepository } from '../../repository/lecture.repository';
import { CourseRepository } from '../../repository/course.repository';
import { SectionRepository } from 'src/repository/section.repository';
import { TuserRepository } from 'src/repository/tuser.repository';
import { UserRepository } from 'src/auth/user.repository';
import { AwsHelper } from 'src/utils/AwsHelper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LectureRepository,
      CourseRepository,
      SectionRepository,
      TuserRepository,
      UserRepository,
    ]),
  ],
  controllers: [LectureController],
  providers: [LectureService, AwsHelper],
})
export class LectureModule {}
