import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateExamDto } from './dto/create-exam.dto';
import { ExamRepository } from './exam.repository';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamRepository)
    private examRepository: ExamRepository,
  ) {}

  async getAllQuestions(exam_id: string): Promise<Object> {
    // get all questions row data
    const tempallquestions = await this.examRepository.getallquestions(exam_id);

    // return needed data
    const allquestions = {
      exam_id: tempallquestions.exam_id,
      examtitle: tempallquestions.examtitle,
      examinstruction: tempallquestions.examinstruction,
      duration: tempallquestions.duration,
      questions: tempallquestions.questionentitys,
    };
    return allquestions;
  }

  async createNewExam(
    section_id: string,
    createExamDto: CreateExamDto,
  ): Promise<Object> {
    // create new exam
    const tempnewexam = await this.examRepository.createnewexam(
      section_id,
      createExamDto,
    );

    // return needed data
    const newexam = {
      exam_id: tempnewexam.exam_id,
      examtitle: tempnewexam.examtitle,
      examinstruction: tempnewexam.examinstruction,
    };
    return newexam;
  }

  async updateExam(
    exam_id: string,
    createExamDto: CreateExamDto,
  ): Promise<Object> {
    // update exam
    const tempupdatedexam = await this.examRepository.updateexam(
      exam_id,
      createExamDto,
    );

    // return needed data
    const updatedexam = {
      examtitle: tempupdatedexam.examtitle,
      examinstruction: tempupdatedexam.examinstruction,
      duration: tempupdatedexam.duration,
    };
    return updatedexam;
  }

  async deleteExam(exam_id: string): Promise<void> {
    return this.examRepository.deleteexam(exam_id);
  }
}
