import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from './repository/question.repository';
import { QuestionEntity } from './entity/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionrepository: QuestionRepository,
  ) {}

  async getAllQuestions(): Promise<QuestionEntity[]> {
    return this.questionrepository.getallquestions();
  }

  async getQuestionById(id: string): Promise<QuestionEntity> {
    const found = await this.questionrepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        'The question you are searching is not Present',
      );
    }
    return found;
  }

  async createNewQuestion(
    id,
    createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionrepository.createnewquestion(id, createquestiondto);
  }

  async deleteQuestion(id: string): Promise<void> {
    const result = await this.questionrepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
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
}
