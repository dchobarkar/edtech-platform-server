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

import { UserEntity } from '../auth/user.entity';

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureService } from './lecture.service';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('lecture')
@UseGuards(AuthGuard())
export class LectureController {
  constructor(private lectureService: LectureService) {}

  // Create new lecture
  @Post('/:section_id')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  createNewLecture(
    @GetUser() user: UserEntity,
    @Param('section_id') section_id: string,
    @Body() createLectureDto: CreateLectureDto,
    @UploadedFile() video: any,
  ): Promise<object> {
    return this.lectureService.createNewLecture(
      section_id,
      createLectureDto,
      video,
    );
  }

  // Update given video lecture
  @Patch('/:lecture_id/update')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  updateLecture(
    @GetUser() user: UserEntity,
    @Param('lecture_id') lecture_id: string,
    @Body() createLectureDto: CreateLectureDto,
    @UploadedFile() video: any,
  ): Promise<object> {
    return this.lectureService.updateLecture(
      lecture_id,
      createLectureDto,
      video,
    );
  }

  // Delete given lecture
  @Delete('/:lecture_id')
  deleteLecture(
    @GetUser() user: UserEntity,
    @Param('lecture_id') lecture_id: string,
  ): Promise<void> {
    return this.lectureService.deleteLecture(lecture_id);
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
