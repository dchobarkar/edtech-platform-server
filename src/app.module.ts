import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { AuthModule } from './auth/auth.module';
import { TuserModule } from './tuser/tuser.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { LectureModule } from './lecture/lecture.module';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TuserModule,
    CourseModule,
    SectionModule,
    LectureModule,
    ExamModule,
    QuestionModule,
  ],
})
export class AppModule {}
