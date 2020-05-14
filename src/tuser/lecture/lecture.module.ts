import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { UserRepository } from 'src/auth/user.repository';
import { TuserRepository } from 'src/repository/tuser.repository';
import { CourseRepository } from '../../repository/course.repository';
import { SectionRepository } from 'src/repository/section.repository';
import { LectureRepository } from '../../repository/lecture.repository';

import { AwsHelper } from 'src/utils/AwsHelper';
import { AuthModule } from 'src/auth/auth.module';

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
