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

  @Get('/:exam_id/allquestions')
  geAllQuestions(
    @GetUser() user: UserEntity,
    @Param('exam_id') exam_id: string,
  ): Promise<object> {
    return this.examService.getAllQuestions(exam_id);
  }

  @Post('/:section_id')
  @UsePipes(ValidationPipe)
  createNewExam(
    @GetUser() user: UserEntity,
    @Param('section_id') section_id: string,
    @Body() createExamDto: CreateExamDto,
  ): Promise<object> {
    return this.examService.createNewExam(section_id, createExamDto);
  }

  @Patch('/:exam_id/update')
  @UsePipes(ValidationPipe)
  updateExam(
    @GetUser() user: UserEntity,
    @Param('exam_id') exam_id: string,
    @Body() createExamDto: CreateExamDto,
  ): Promise<object> {
    return this.examService.updateExam(exam_id, createExamDto);
  }

  @Delete('/:exam_id')
  deleteExam(
    @GetUser() user: UserEntity,
    @Param('exam_id') exam_id: string,
  ): Promise<void> {
    return this.examService.deleteExam(exam_id);
  }
}
