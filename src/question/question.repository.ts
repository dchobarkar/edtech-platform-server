import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './question.entity';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  async createnewquestion(
    exam_id: string,
    createQuestionDto: CreateQuestionDto,
    imageUrl: string,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, answer } = createQuestionDto;
    const newQuestion = new QuestionEntity();
    newQuestion.que = que;
    newQuestion.opt1 = opt1;
    newQuestion.opt2 = opt2;
    newQuestion.opt3 = opt3;
    newQuestion.opt4 = opt4;
    newQuestion.answer = answer;
    newQuestion.queImage = imageUrl;
    newQuestion.examEntityExamId = exam_id;
    await newQuestion.save();
    return newQuestion;
  }

  async getquestionbyid(question_id: string): Promise<QuestionEntity> {
    return this.findOne(question_id);
  }

  async updatequestion(
    createQuestionDto: CreateQuestionDto,
    toBeUpdatedQuestion: QuestionEntity,
    imageUrl: any,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, answer } = createQuestionDto;
    toBeUpdatedQuestion.que = que;
    toBeUpdatedQuestion.opt1 = opt1;
    toBeUpdatedQuestion.opt2 = opt2;
    toBeUpdatedQuestion.opt3 = opt3;
    toBeUpdatedQuestion.opt4 = opt4;
    toBeUpdatedQuestion.answer = answer;
    toBeUpdatedQuestion.queImage = imageUrl;
    await toBeUpdatedQuestion.save();
    return toBeUpdatedQuestion;
  }

  async deletequestion(question_id: string): Promise<void> {
    const deletedQuestion = await this.delete(question_id);
    if (deletedQuestion.affected === 0) {
      throw new NotFoundException();
    }
  }
}
