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

import { LectureService } from './lecture.service';
import { LectureEntity } from './entity/lecture.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';

@Controller('/lecture')
export class LectureController {
  constructor(private lectureservice: LectureService) {}

  @Get()
  getAllLectures(): Promise<LectureEntity[]> {
    return this.lectureservice.getAllLectures();
  }

  @Get('/:id')
  getLectureById(@Param('id') id: string): Promise<LectureEntity> {
    return this.lectureservice.getLectureById(id);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewLecture(
    @Param('id') id,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lectureservice.createNewLecture(id, createlecturedto);
  }

  @Delete('/:id')
  deletesection(@Param('id') id: string): Promise<void> {
    return this.lectureservice.deleteLecture(id);
  }

  @Patch('/:id/update')
  updateLecture(
    @Param('id') id: string,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lectureservice.updateLecture(id, createlecturedto);
  }
}
