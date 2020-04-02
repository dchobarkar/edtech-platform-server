import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repository/question.repository';
import { QuestionEntity } from './entity/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionrepository: QuestionRepository,
  ) {}

  async createNewQuestion(
    id: string,
    createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionrepository.createnewquestion(id, createquestiondto);
  }

  async updateQuestion(
    id: string,
    createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    const ToBeUpdated = await this.getQuestionById(id);
    return this.questionrepository.updatequestion(
      createquestiondto,
      ToBeUpdated,
    );
  }

  async getQuestionById(id: string): Promise<QuestionEntity> {
    const question = await this.questionrepository.findOne(id);
    if (!question) {
      throw new NotFoundException(
        'The question you are searching is not Present',
      );
    }
    return question;
  }

  async deleteQuestion(id: string): Promise<void> {
    const deleted = await this.questionrepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException('The question to be deleted is not present');
    }
  }
}
