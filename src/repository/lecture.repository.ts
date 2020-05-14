import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateLectureDto } from '../tuser/dto/create-lecture.dto';
import { LectureEntity } from '../entity/lecture.entity';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async createnewlecture(
    id: string,
    createlecturedto: CreateLectureDto,
    videoUrl: string,
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro } = createlecturedto;
    const NewLecture = new LectureEntity();
    NewLecture.lecturetitle = lecturetitle;
    NewLecture.lectureintro = lectureintro;
    NewLecture.lecturevideo = videoUrl;
    NewLecture.sectionentitySectionId = id;
    await NewLecture.save();
    return NewLecture;
  }

  async updatelecture(
    createlecturedto: CreateLectureDto,
    ToBeUpdated: LectureEntity,
    videoUrl: string,
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro } = createlecturedto;
    ToBeUpdated.lecturetitle = lecturetitle;
    ToBeUpdated.lectureintro = lectureintro;
    ToBeUpdated.lecturevideo = videoUrl;
    await ToBeUpdated.save();
    return ToBeUpdated;
  }
}
