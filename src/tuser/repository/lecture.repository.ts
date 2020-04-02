import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateLectureDto } from '../dto/create-lecture.dto';
import { LectureEntity } from '../entity/lecture.entity';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async createnewlecture(
    id: string,
    createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro, lecturevideo } = createlecturedto;

    const NewLecture = new LectureEntity();

    NewLecture.lecturetitle = lecturetitle;
    NewLecture.lectureintro = lectureintro;
    NewLecture.lecturevideo = lecturevideo;

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
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro, lecturevideo } = createlecturedto;

    ToBeUpdated.lecturetitle = lecturetitle;
    ToBeUpdated.lectureintro = lectureintro;
    ToBeUpdated.lecturevideo = lecturevideo;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
