import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuserModule } from './tuser/tuser.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CourseModule } from './tuser/course.module';
import { SectionModule } from './tuser/section.module';
import { LectureModule } from './tuser/lecture.module';
import { ExamModule } from './tuser/exam.module';
import { QuestionModule } from './tuser/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TuserModule,
    CourseModule,
    SectionModule,
    LectureModule,
    ExamModule,
    QuestionModule,
  ],
})
export class AppModule {}
