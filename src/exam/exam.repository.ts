import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateExamDto } from './dto/create-exam.dto';
import { ExamEntity } from './exam.entity';

@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {
  async getallquestions(exam_id: string): Promise<ExamEntity> {
    return this.findOne(
      { exam_id: exam_id },
      {
        relations: ['questionentitys'],
      },
    );
  }

  async createnewexam(
    section_id: string,
    createExamDto: CreateExamDto,
  ): Promise<ExamEntity> {
    const { examtitle, examinstruction, duration } = createExamDto;
    const NewExam = new ExamEntity();
    NewExam.examtitle = examtitle;
    NewExam.examinstruction = examinstruction;
    NewExam.duration = duration;
    NewExam.sectionentitySectionId = section_id;
    await NewExam.save();
    return NewExam;
  }

  async updateexam(
    exam_id: string,
    createExamDto: CreateExamDto,
  ): Promise<ExamEntity> {
    const { examtitle, examinstruction, duration } = createExamDto;

    // search tobeupdated exam
    const tobeupdatedexam = await this.findOne(exam_id);

    // updated exam
    tobeupdatedexam.examtitle = examtitle;
    tobeupdatedexam.examinstruction = examinstruction;
    tobeupdatedexam.duration = duration;
    await tobeupdatedexam.save();
    return tobeupdatedexam;
  }

  async deleteexam(exam_id: string): Promise<void> {
    const deleted = await this.delete(exam_id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
