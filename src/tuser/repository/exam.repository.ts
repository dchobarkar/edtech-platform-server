import { EntityRepository, Repository } from 'typeorm';
import { ExamEntity } from '../entity/exam.entity';
import { CreateExamDto } from '../dto/create-exam.dto';

@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {
  async getallexams(): Promise<ExamEntity[]> {
    const query = this.createQueryBuilder('exam');
    const getallexams = await query.getMany();

    return getallexams;
  }

  async createnewexam(id, createexamdto: CreateExamDto): Promise<ExamEntity> {
    const { examtitle, examinstruction, duration } = createexamdto;

    const NewExam = new ExamEntity();

    NewExam.examtitle = examtitle;
    NewExam.examinstruction = examinstruction;
    NewExam.duration = duration;

    NewExam.sectionentity = id;

    await NewExam.save();

    return NewExam;
  }

  async updateexam(
    createexamdto: CreateExamDto,
    ToBeUpdated: ExamEntity,
  ): Promise<ExamEntity> {
    const { examtitle, examinstruction, duration } = createexamdto;

    ToBeUpdated.examtitle = examtitle;
    ToBeUpdated.examinstruction = examinstruction;
    ToBeUpdated.duration = duration;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
