import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureRepository } from './repository/lecture.repository';
import { LectureEntity } from './entity/lecture.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    private lecturerepository: LectureRepository,
  ) {}

  async getAllLectures(): Promise<LectureEntity[]> {
    return this.lecturerepository.getalllectures();
  }

  async getLectureById(id: string): Promise<LectureEntity> {
    const found = await this.lecturerepository.findOne(id);

    if (!found) {
      throw new NotFoundException(
        'The Course you are searching is not Present',
      );
    }

    return found;
  }

  async createNewLecture(
    id,
    createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    return this.lecturerepository.createnewlecture(id, createlecturedto);
  }

  async deleteLecture(id: string): Promise<void> {
    const result = await this.lecturerepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }

  async updateLecture(
    id: string,
    createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    const ToBeUpdated = await this.getLectureById(id);
    return this.lecturerepository.updatelecture(createlecturedto, ToBeUpdated);
  }
}
