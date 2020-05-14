import { EntityRepository, Repository } from 'typeorm';

import { CreateLectureDto } from '../tuser/dto/create-lecture.dto';
import { LectureEntity } from '../entity/lecture.entity';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async createnewlecture(
    id: string,
    createlecturedto: CreateLectureDto,
    videoUrl: string,
  ): Promise<Object> {
    const { lecturetitle, lectureintro } = createlecturedto;
    const NewLecture = new LectureEntity();
    NewLecture.lecturetitle = lecturetitle;
    NewLecture.lectureintro = lectureintro;
    NewLecture.lecturevideo = videoUrl;
    NewLecture.sectionentitySectionId = id;
    await NewLecture.save();
    const newLecture = {
      lecture_id: NewLecture.lecture_id,
      lecturetitle: NewLecture.lecturetitle,
      lectureintro: NewLecture.lectureintro,
      lecturevideo: NewLecture.lecturevideo,
    };
    return newLecture;
  }

  async updatelecture(
    createlecturedto: CreateLectureDto,
    ToBeUpdated: LectureEntity,
    videoUrl: string,
  ): Promise<Object> {
    const { lecturetitle, lectureintro } = createlecturedto;
    ToBeUpdated.lecturetitle = lecturetitle;
    ToBeUpdated.lectureintro = lectureintro;
    ToBeUpdated.lecturevideo = videoUrl;
    await ToBeUpdated.save();
    const updatedLecture = {
      lecture_id: ToBeUpdated.lecture_id,
      lecturetitle: ToBeUpdated.lecturetitle,
      lectureintro: ToBeUpdated.lectureintro,
      lecturevideo: ToBeUpdated.lecturevideo,
    };
    return updatedLecture;
  }
}
