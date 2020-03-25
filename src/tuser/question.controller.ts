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
import { QuestionService } from './question.service';
import { QuestionEntity } from './entity/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('/question')
export class QuestionController {
  constructor(private questionservice: QuestionService) {}

  @Get()
  getAllQuestions(): Promise<QuestionEntity[]> {
    return this.questionservice.getAllQuestions();
  }

  @Get('/:id')
  getquestionById(@Param('id') id: string): Promise<QuestionEntity> {
    return this.questionservice.getQuestionById(id);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewQuestion(
    @Param('id') id,
    @Body() createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionservice.createNewQuestion(id, createquestiondto);
  }

  @Delete('/:id')
  deletequestion(@Param('id') id: string): Promise<void> {
    return this.questionservice.deleteQuestion(id);
  }

  @Patch('/:id/update')
  updateQuestion(
    @Param('id') id: string,
    @Body() createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionservice.updateQuestion(id, createquestiondto);
  }
}
