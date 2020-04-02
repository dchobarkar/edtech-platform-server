import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureRepository } from './repository/lecture.repository';
import { LectureEntity } from './entity/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    private lecturerepository: LectureRepository,
  ) {}

  async createNewLecture(
    id: string,
    createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lecturerepository.createnewlecture(id, createlecturedto);
  }

  async updateLecture(
    id: string,
    createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    const ToBeUpdated = await this.getLectureById(id);
    return this.lecturerepository.updatelecture(createlecturedto, ToBeUpdated);
  }

  async getLectureById(id: string): Promise<LectureEntity> {
    const lecture = await this.lecturerepository.findOne(id);

    if (!lecture) {
      throw new NotFoundException(
        'The Lecture you are searching is not Present',
      );
    }

    return lecture;
  }

  async deleteLecture(id: string): Promise<void> {
    const deleted = await this.lecturerepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException('The Lecture to be deleted is not present');
    }
  }
}
