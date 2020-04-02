import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateExamDto } from '../dto/create-exam.dto';
import { ExamEntity } from '../entity/exam.entity';

@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {
  async createnewexam(
    id: string,
    createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    const { examtitle, examinstruction, duration } = createexamdto;

    const NewExam = new ExamEntity();

    NewExam.examtitle = examtitle;
    NewExam.examinstruction = examinstruction;
    NewExam.duration = duration;

    NewExam.sectionentitySectionId = id;

    try {
      await NewExam.save();
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
