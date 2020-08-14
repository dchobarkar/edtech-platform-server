import {
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('/question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  // Create new question
  @Post('/:exam_id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  createNewQuestion(
    @UploadedFile() image: any,
    @Param('exam_id') exam_id: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<object> {
    return this.questionService.createNewQuestion(
      exam_id,
      createQuestionDto,
      image,
    );
  }

  // Update given question
  @Patch('/:question_id/update')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  updateQuestion(
    @UploadedFile() image: any,
    @Param('question_id') question_id: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<object> {
    return this.questionService.updateQuestion(
      question_id,
      createQuestionDto,
      image,
    );
  }

  // Delete given question
  @Delete('/:question_id')
  deleteQuestion(@Param('question_id') question_id: string): Promise<void> {
    return this.questionService.deleteQuestion(question_id);
  }
}
