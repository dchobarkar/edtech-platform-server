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

import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionService } from './question.service';
import { QuestionEntity } from '../../entity/question.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('/question')
export class QuestionController {
  constructor(private questionservice: QuestionService) {}

  @Post('/:id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  createNewQuestion(
    @UploadedFile() image: any,
    @Param('id') id: string,
    @Body() createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionservice.createNewQuestion(id, createquestiondto, image);
  }

  @Patch('/:id/update')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  updateQuestion(
    @UploadedFile() image: any,
    @Param('id') id: string,
    @Body() createquestiondto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionservice.updateQuestion(id, createquestiondto, image);
  }

  @Delete('/:id')
  deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.questionservice.deleteQuestion(id);
  }
}
