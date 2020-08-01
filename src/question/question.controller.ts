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

  @Post('/:id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  createNewQuestion(
    @UploadedFile() image: any,
    @Param('id') exam_id: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Object> {
    return this.questionService.createNewQuestion(
      exam_id,
      createQuestionDto,
      image,
    );
  }

  @Patch('/:id/update')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  updateQuestion(
    @UploadedFile() image: any,
    @Param('id') question_id: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Object> {
    return this.questionService.updateQuestion(
      question_id,
      createQuestionDto,
      image,
    );
  }

  @Delete('/:id')
  deleteQuestion(@Param('id') question_id: string): Promise<void> {
    return this.questionService.deleteQuestion(question_id);
  }
}
