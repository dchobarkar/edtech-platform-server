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

import { CreateExamDto } from '../dto/create-exam.dto';
import { ExamService } from './exam.service';
import { ExamEntity } from '../../entity/exam.entity';

@Controller('exam')
export class ExamController {
  constructor(private examservice: ExamService) {}

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewExam(
    @Param('id') id: string,
    @Body() createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    return this.examservice.createNewExam(id, createexamdto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateExam(
    @Param('id') id: string,
    @Body() createexamdto: CreateExamDto,
  ): Promise<ExamEntity> {
    return this.examservice.updateExam(id, createexamdto);
  }

  @Delete('/:id')
  deleteExam(@Param('id') id: string): Promise<void> {
    return this.examservice.deleteExam(id);
  }

  @Get('/:id/allquestions')
  geAllQuestions(@Param('id') id: string): Promise<ExamEntity> {
    return this.examservice.getAllQuestions(id);
  }
}
