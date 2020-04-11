import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateQuestionDto } from '../tuser/dto/create-question.dto';
import { QuestionEntity } from '../entity/question.entity';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  async createnewquestion(
    id: string,
    createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, answer, queimage } = createquestiondto;

    const NewQuestion = new QuestionEntity();

    NewQuestion.que = que;
    NewQuestion.opt1 = opt1;
    NewQuestion.opt2 = opt2;
    NewQuestion.opt3 = opt3;
    NewQuestion.opt4 = opt4;
    NewQuestion.answer = answer;
    NewQuestion.queimage = queimage;

    NewQuestion.examentityExamId = id;

    try {
      await NewQuestion.save();
    } catch (error) {
      if (error.code === '23502') {
        throw new InternalServerErrorException(
          'Please provide all information',
        );
      } else if (error.code === '22001') {
        throw new InternalServerErrorException('Value too long for given type');
      } else {
        throw new InternalServerErrorException('Unknown');
      }
    }
    return NewQuestion;
  }

  async updatequestion(
    createquestiondto: CreateQuestionDto,
    ToBeUpdated: QuestionEntity,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, answer, queimage } = createquestiondto;

    ToBeUpdated.que = que;
    ToBeUpdated.opt1 = opt1;
    ToBeUpdated.opt2 = opt2;
    ToBeUpdated.opt3 = opt3;
    ToBeUpdated.opt4 = opt4;
    ToBeUpdated.answer = answer;
    ToBeUpdated.queimage = queimage;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
