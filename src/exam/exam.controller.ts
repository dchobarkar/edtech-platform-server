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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../auth/user.entity';

import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('exam')
@UseGuards(AuthGuard())
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get('/:id/allquestions')
  geAllQuestions(
    @GetUser() user: UserEntity,
    @Param('id') exam_id: string,
  ): Promise<Object> {
    return this.examService.getAllQuestions(exam_id);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewExam(
    @GetUser() user: UserEntity,
    @Param('id') section_id: string,
    @Body() createExamDto: CreateExamDto,
  ): Promise<Object> {
    return this.examService.createNewExam(section_id, createExamDto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateExam(
    @GetUser() user: UserEntity,
    @Param('id') exam_id: string,
    @Body() createExamDto: CreateExamDto,
  ): Promise<Object> {
    return this.examService.updateExam(exam_id, createExamDto);
  }

  @Delete('/:id')
  deleteExam(
    @GetUser() user: UserEntity,
    @Param('id') exam_id: string,
  ): Promise<void> {
    return this.examService.deleteExam(exam_id);
  }
}
