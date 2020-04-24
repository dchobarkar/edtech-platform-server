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
  Get,
} from '@nestjs/common';

import { CreateLectureDto } from '../dto/create-lecture.dto';
import { LectureService } from './lecture.service';
import { LectureEntity } from '../../entity/lecture.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lecture')
export class LectureController {
  constructor(private lectureservice: LectureService) {}

  @Post('/:id')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  createNewLecture(
    @UploadedFile() video: any,
    @Param('id') id: string,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<any> {
    return this.lectureservice.createNewLecture(id, createlecturedto, video);
  }

  @Patch('/:id/update')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  updateLecture(
    @Param('id') id: string,
    @UploadedFile() video: any,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lectureservice.updateLecture(id, createlecturedto, video);
  }

  @Delete('/:id')
  deleteSection(@Param('id') id: string): Promise<void> {
    return this.lectureservice.deleteLecture(id);
  }

  //For futute file upload feature
  // @Post('/files/:id')
  // @UseInterceptors(
  //   AnyFilesInterceptor()
  // )
  // @UsePipes(ValidationPipe)
  // addStudyDocuments(
  //   @UploadedFiles() files: any,
  //   @Param('id') id: string,
  //   @Body() createlecturedto: CreateLectureDto,
  // ): Promise<LectureEntity> {
  //   //return this.lectureservice.addStudyDocuments(id, createlecturedto, file);
  // }
}
