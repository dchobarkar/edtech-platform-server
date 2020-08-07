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

  async getAllQuestions(exam_id: string): Promise<object> {
    // get all questions row data
    const tempAllQuestions = await this.examRepository.getallquestions(exam_id);

    // return needed data
    const allQuestions = {
      exam_id: tempAllQuestions.exam_id,
      examTitle: tempAllQuestions.examTitle,
      examInstruction: tempAllQuestions.examInstruction,
      duration: tempAllQuestions.duration,
      questions: tempAllQuestions.questionEntitys,
    };
    return allQuestions;
  }

  async createNewExam(
    section_id: string,
    createExamDto: CreateExamDto,
  ): Promise<object> {
    // create new exam
    const tempNewExam = await this.examRepository.createnewexam(
      section_id,
      createExamDto,
    );

    // return needed data
    const newExam = {
      exam_id: tempNewExam.exam_id,
      examTitle: tempNewExam.examTitle,
      examInstruction: tempNewExam.examInstruction,
    };
    return newExam;
  }

  async updateExam(
    exam_id: string,
    createExamDto: CreateExamDto,
  ): Promise<object> {
    // update exam
    const tempUpdatedExam = await this.examRepository.updateexam(
      exam_id,
      createExamDto,
    );

    // return needed data
    const updatedExam = {
      examTitle: tempUpdatedExam.examTitle,
      examInstruction: tempUpdatedExam.examInstruction,
      duration: tempUpdatedExam.duration,
    };
    return updatedExam;
  }

  async deleteExam(exam_id: string): Promise<void> {
    return this.examRepository.deleteexam(exam_id);
  }
}
