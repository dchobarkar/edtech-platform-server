import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateExamDto } from './dto/create-exam.dto';
import { ExamRepository } from './repository/exam.repository';
import { ExamEntity } from './entity/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamRepository)
    private examrepository: ExamRepository,
  ) {}

  async createNewExam(
    id: string,
    createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    return this.examrepository.createnewexam(id, createexamdto);
  }

  async updateExam(
    id: string,
    createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    const ToBeUpdated = await this.getExamById(id);
    return this.examrepository.updateexam(createexamdto, ToBeUpdated);
  }

  async getExamById(id: string): Promise<ExamEntity> {
    const exam = await this.examrepository.findOne(id);
    if (!exam) {
      throw new NotFoundException('The exam you are searching is not Present');
    }
    return exam;
  }

  async deleteExam(id: string): Promise<void> {
    const deleted = await this.examrepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException('The Exam to be deleted is not present');
    }
  }

  async getAllQuestions(id: string): Promise<ExamEntity> {
    const exam = await this.getExamById(id);
    const examdetails = await this.examrepository.findOne(
      { exam_id: exam.exam_id },
      {
        relations: ['questionentitys'],
      },
    );

    return examdetails;
  }
}
