import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { UserRepository } from 'src/auth/user.repository';
import { CourseRepository } from 'src/repository/course.repository';
import { SectionRepository } from 'src/repository/section.repository';
import { ExamRepository } from 'src/repository/exam.repository';
import { QuestionRepository } from '../../repository/question.repository';

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
