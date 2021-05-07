import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../auth/user.repository';

import { CourseRepository } from '../course/course.repository';

import { SectionRepository } from '../section/section.repository';

import { ExamRepository } from '../exam/exam.repository';

import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionRepository } from './question.repository';

import { AwsHelper } from 'src/utils/AwsHelper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionRepository,
      ExamRepository,
      SectionRepository,
      CourseRepository,
      UserRepository,
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, AwsHelper],
})
export class QuestionModule {}
