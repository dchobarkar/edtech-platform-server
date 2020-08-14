import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateExamDto } from './dto/create-exam.dto';
import { ExamEntity } from './exam.entity';

@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {
  // Get all questions of given exam from database
  async getallquestions(exam_id: string): Promise<ExamEntity> {
    return this.findOne(
      { exam_id: exam_id },
      {
        relations: ['questionEntitys'],
      },
    );
  }

  // Create new exam from database
  async createnewexam(
    section_id: string,
    createExamDto: CreateExamDto,
  ): Promise<ExamEntity> {
    const { examTitle, examInstruction, duration } = createExamDto;
    const newExam = new ExamEntity();
    newExam.examTitle = examTitle;
    newExam.examInstruction = examInstruction;
    newExam.duration = duration;
    newExam.sectionEntitySectionId = section_id;
    await newExam.save();
    return newExam;
  }

  // Update given exam from database
  async updateexam(
    exam_id: string,
    createExamDto: CreateExamDto,
  ): Promise<ExamEntity> {
    const { examTitle, examInstruction, duration } = createExamDto;

    // search tobeupdated exam
    const toBeUpdatedExam = await this.findOne(exam_id);

    // updated exam
    toBeUpdatedExam.examTitle = examTitle;
    toBeUpdatedExam.examInstruction = examInstruction;
    toBeUpdatedExam.duration = duration;
    await toBeUpdatedExam.save();
    return toBeUpdatedExam;
  }

  // Delete given exam from database
  async deleteexam(exam_id: string): Promise<void> {
    const deletedExam = await this.delete(exam_id);
    if (deletedExam.affected === 0) {
      throw new NotFoundException();
    }
  }
}
