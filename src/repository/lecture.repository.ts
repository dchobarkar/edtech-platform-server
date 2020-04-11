import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateLectureDto } from '../tuser/dto/create-lecture.dto';
import { LectureEntity } from '../entity/lecture.entity';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async createnewlecture(
    id: string,
    createlecturedto: CreateLectureDto,
    videoUrl: string
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro } = createlecturedto;

    const NewLecture = new LectureEntity();

    NewLecture.lecturetitle = lecturetitle;
    NewLecture.lectureintro = lectureintro;
    NewLecture.lecturevideo = videoUrl;

    NewLecture.sectionentitySectionId = id;

    try {
      await NewLecture.save();
    } catch (error) {
      if (error.code === '23502') {
        throw new InternalServerErrorException(
          'Please provide all information',
        );
      } else if (error.code === '22001') {
        throw new InternalServerErrorException('Value too long for given type');
      } else {
        throw new InternalServerErrorException('Unknown');
      }
    }

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
