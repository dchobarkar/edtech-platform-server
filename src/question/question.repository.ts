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
    const NewQuestion = new QuestionEntity();
    NewQuestion.que = que;
    NewQuestion.opt1 = opt1;
    NewQuestion.opt2 = opt2;
    NewQuestion.opt3 = opt3;
    NewQuestion.opt4 = opt4;
    NewQuestion.answer = answer;
    NewQuestion.queimage = imageUrl;
    NewQuestion.examentityExamId = exam_id;
    await NewQuestion.save();
    return NewQuestion;
  }

  async getquestionbyid(question_id: string): Promise<QuestionEntity> {
    return this.findOne(question_id);
  }

  async updatequestion(
    createQuestionDto: CreateQuestionDto,
    tobeupdatedquestion: QuestionEntity,
    imageUrl: any,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, answer } = createQuestionDto;
    tobeupdatedquestion.que = que;
    tobeupdatedquestion.opt1 = opt1;
    tobeupdatedquestion.opt2 = opt2;
    tobeupdatedquestion.opt3 = opt3;
    tobeupdatedquestion.opt4 = opt4;
    tobeupdatedquestion.answer = answer;
    tobeupdatedquestion.queimage = imageUrl;
    await tobeupdatedquestion.save();
    return tobeupdatedquestion;
  }

  async deletequestion(question_id: string): Promise<void> {
    const deleted = await this.delete(question_id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
