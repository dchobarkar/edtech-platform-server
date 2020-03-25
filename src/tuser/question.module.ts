import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from './repository/question.repository';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
