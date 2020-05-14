import { EntityRepository, Repository } from 'typeorm';

import { CreateQuestionDto } from '../tuser/dto/create-question.dto';
import { QuestionEntity } from '../entity/question.entity';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  async createnewquestion(
    id: string,
    createquestiondto: CreateQuestionDto,
    imageUrl: string,
  ): Promise<Object> {
    const { que, opt1, opt2, opt3, opt4, answer } = createquestiondto;
    const NewQuestion = new QuestionEntity();
    NewQuestion.que = que;
    NewQuestion.opt1 = opt1;
    NewQuestion.opt2 = opt2;
    NewQuestion.opt3 = opt3;
    NewQuestion.opt4 = opt4;
    NewQuestion.answer = answer;
    NewQuestion.queimage = imageUrl;
    NewQuestion.examentityExamId = id;
    await NewQuestion.save();
    const newQuestion = {
      que_id: NewQuestion.que_id,
      que: NewQuestion.que,
      opt1: NewQuestion.opt1,
      opt2: NewQuestion.opt2,
      opt3: NewQuestion.opt3,
      opt4: NewQuestion.opt4,
      answer: NewQuestion.answer,
      queimage: NewQuestion.queimage,
    };
    return newQuestion;
  }

  async updatequestion(
    createquestiondto: CreateQuestionDto,
    ToBeUpdated: QuestionEntity,
    imageUrl: any,
  ): Promise<Object> {
    const { que, opt1, opt2, opt3, opt4, answer } = createquestiondto;
    ToBeUpdated.que = que;
    ToBeUpdated.opt1 = opt1;
    ToBeUpdated.opt2 = opt2;
    ToBeUpdated.opt3 = opt3;
    ToBeUpdated.opt4 = opt4;
    ToBeUpdated.answer = answer;
    ToBeUpdated.queimage = imageUrl;
    await ToBeUpdated.save();
    const updatedQuestion = {
      que_id: ToBeUpdated.que_id,
      que: ToBeUpdated.que,
      opt1: ToBeUpdated.opt1,
      opt2: ToBeUpdated.opt2,
      opt3: ToBeUpdated.opt3,
      opt4: ToBeUpdated.opt4,
      answer: ToBeUpdated.answer,
      queimage: ToBeUpdated.queimage,
    };
    return updatedQuestion;
  }
}
