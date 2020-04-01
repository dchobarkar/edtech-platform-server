import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamRepository } from './repository/exam.repository';
import { ExamEntity } from './entity/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamRepository)
    private examrepository: ExamRepository,
  ) {}

  async getAllExams(): Promise<ExamEntity[]> {
    return this.examrepository.getallexams();
  }

  async getExamById(id: string): Promise<ExamEntity> {
    const found = await this.examrepository.findOne(id);
    if (!found) {
      throw new NotFoundException('The exam you are searching is not Present');
    }
    return found;
  }

  async createNewExam(id, createexamdto: CreateExamDto): Promise<ExamEntity> {
    return this.examrepository.createnewexam(id, createexamdto);
  }

  async deleteExam(id: string): Promise<void> {
    const result = await this.examrepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }

  async updateExam(
    id: string,
    createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    const ToBeUpdated = await this.getExamById(id);
    return this.examrepository.updateexam(createexamdto, ToBeUpdated);
  }

  async getAllQuestions(id: string) {
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
