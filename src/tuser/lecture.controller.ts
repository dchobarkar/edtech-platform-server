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

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureService } from './lecture.service';
import { LectureEntity } from './entity/lecture.entity';

@Controller('lecture')
export class LectureController {
  constructor(private lectureservice: LectureService) {}

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewLecture(
    @Param('id') id: string,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lectureservice.createNewLecture(id, createlecturedto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateLecture(
    @Param('id') id: string,
    @Body() createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lectureservice.updateLecture(id, createlecturedto);
  }

  @Delete('/:id')
  deleteSection(@Param('id') id: string): Promise<void> {
    return this.lectureservice.deleteLecture(id);
  }
}
