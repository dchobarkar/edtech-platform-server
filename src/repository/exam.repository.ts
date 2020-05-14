import { EntityRepository, Repository } from 'typeorm';

import { CreateExamDto } from '../tuser/dto/create-exam.dto';
import { ExamEntity } from '../entity/exam.entity';

@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {
  async createnewexam(
    id: string,
    createexamdto: CreateExamDto,
  ): Promise<Object> {
    const { examtitle, examinstruction, duration } = createexamdto;
    const NewExam = new ExamEntity();
    NewExam.examtitle = examtitle;
    NewExam.examinstruction = examinstruction;
    NewExam.duration = duration;
    NewExam.sectionentitySectionId = id;
    await NewExam.save();
    const newExam = {
      exam_id: NewExam.exam_id,
      examtitle: NewExam.examtitle,
      examinstruction: NewExam.examinstruction,
    };
    return newExam;
  }

  async updateexam(
    createexamdto: CreateExamDto,
    ToBeUpdated: ExamEntity,
  ): Promise<Object> {
    const { examtitle, examinstruction, duration } = createexamdto;
    ToBeUpdated.examtitle = examtitle;
    ToBeUpdated.examinstruction = examinstruction;
    ToBeUpdated.duration = duration;
    await ToBeUpdated.save();
    const updatedExam = {
      exam_id: ToBeUpdated.exam_id,
      examtitle: ToBeUpdated.examtitle,
      examinstruction: ToBeUpdated.examinstruction,
      duration: ToBeUpdated.duration,
    };
    return updatedExam;
  }
}
