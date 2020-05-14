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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { CreateLectureDto } from '../dto/create-lecture.dto';
import { LectureService } from './lecture.service';
import { UserEntity } from '../../auth/user.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('lecture')
@UseGuards(AuthGuard())
export class LectureController {
  constructor(private lectureservice: LectureService) {}

  @Post('/:id')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  createNewLecture(
    @GetUser() user: UserEntity,
    @UploadedFile() video: any,
    @Param('id') id: string,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<Object> {
    return this.lectureservice.createNewLecture(id, createlecturedto, video);
  }

  @Patch('/:id/update')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  updateLecture(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @UploadedFile() video: any,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<Object> {
    return this.lectureservice.updateLecture(id, createlecturedto, video);
  }

  @Delete('/:id')
  deleteLecture(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<void> {
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
