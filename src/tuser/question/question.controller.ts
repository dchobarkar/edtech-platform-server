import {
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';

import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionService } from './question.service';
import { QuestionEntity } from '../../entity/question.entity';

@Controller('/question')
export class QuestionController {
  constructor(private questionservice: QuestionService) {}

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewQuestion(
    @Param('id') id: string,
    @Body() createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionservice.createNewQuestion(id, createquestiondto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateQuestion(
    @Param('id') id: string,
    @Body() createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionservice.updateQuestion(id, createquestiondto);
  }

  @Delete('/:id')
  deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.questionservice.deleteQuestion(id);
  }
}
