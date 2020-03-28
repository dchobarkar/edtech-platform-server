import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { TuserModule } from './tuser/tuser.module';
import { CourseModule } from './tuser/course.module';
import { SectionModule } from './tuser/section.module';
import { LectureModule } from './tuser/lecture.module';
import { ExamModule } from './tuser/exam.module';
import { QuestionModule } from './tuser/question.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TuserModule,
    CourseModule,
    SectionModule,
    LectureModule,
    ExamModule,
    QuestionModule,
    AuthModule,
  ],
})
export class AppModule {}
