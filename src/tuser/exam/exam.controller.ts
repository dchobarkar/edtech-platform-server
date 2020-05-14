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

import { CreateExamDto } from '../dto/create-exam.dto';
import { ExamService } from './exam.service';
import { UserEntity } from '../../auth/user.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('exam')
@UseGuards(AuthGuard())
export class ExamController {
  constructor(private examservice: ExamService) {}

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewExam(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() createexamdto: CreateExamDto,
  ): Promise<Object> {
    return this.examservice.createNewExam(id, createexamdto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateExam(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() createexamdto: CreateExamDto,
  ): Promise<Object> {
    return this.examservice.updateExam(id, createexamdto);
  }

  @Delete('/:id')
  deleteExam(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<void> {
    return this.examservice.deleteExam(id);
  }

  @Get('/:id/allquestions')
  geAllQuestions(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<Object> {
    return this.examservice.getAllQuestions(id);
  }
}
