import { EntityRepository, Repository } from 'typeorm';
import { QuestionEntity } from '../entity/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  async getallquestions(): Promise<QuestionEntity[]> {
    const query = this.createQueryBuilder('question');
    const getallquestions = await query.getMany();

    return getallquestions;
  }

  async createnewquestion(
    id,
    createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, queimage, answer } = createquestiondto;

    const NewQuestion = new QuestionEntity();

    NewQuestion.que = que;
    NewQuestion.opt1 = opt1;
    NewQuestion.opt2 = opt2;
    NewQuestion.opt3 = opt3;
    NewQuestion.opt4 = opt4;
    NewQuestion.queimage = queimage;
    NewQuestion.answer = answer;

    NewQuestion.examentity = id;
    await NewQuestion.save();
    return NewQuestion;
  }

  async updatequestion(
    createquestiondto: CreateQuestionDto,
    ToBeUpdated: QuestionEntity,
  ): Promise<QuestionEntity> {
    const { que, opt1, opt2, opt3, opt4, queimage, answer } = createquestiondto;

    ToBeUpdated.que = que;
    ToBeUpdated.opt1 = opt1;
    ToBeUpdated.opt2 = opt2;
    ToBeUpdated.opt3 = opt3;
    ToBeUpdated.opt4 = opt4;
    ToBeUpdated.queimage = queimage;
    ToBeUpdated.answer = answer;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
