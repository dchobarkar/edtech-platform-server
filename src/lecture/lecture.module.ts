import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../auth/user.repository';

import { TuserRepository } from '../tuser/tuser.repository';

import { CourseRepository } from '../course/course.repository';

import { SectionRepository } from '../section/section.repository';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepository } from './lecture.repository';

import { AwsHelper } from '../utils/AwsHelper';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LectureRepository,
      CourseRepository,
      SectionRepository,
      TuserRepository,
      UserRepository,
    ]),
    AuthModule,
  ],
  controllers: [LectureController],
  providers: [LectureService, AwsHelper],
})
export class LectureModule {}
