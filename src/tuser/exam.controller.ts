import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ExamEntity } from './entity/exam.entity';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Controller('/exam')
export class ExamController {
  constructor(private examservice: ExamService) {}

  @Get()
  getAllExams(): Promise<ExamEntity[]> {
    return this.examservice.getAllExams();
  }

  @Get('/:id')
  getexamById(@Param('id') id: string): Promise<ExamEntity> {
    return this.examservice.getExamById(id);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewExam(
    @Param('id') id,
    @Body() createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    return this.examservice.createNewExam(id, createexamdto);
  }

  @Delete('/:id')
  deleteexam(@Param('id') id: string): Promise<void> {
    return this.examservice.deleteExam(id);
  }

  @Patch('/:id/update')
  updateExam(
    @Param('id') id: string,
    @Body() createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    return this.examservice.updateExam(id, createexamdto);
  }
}
