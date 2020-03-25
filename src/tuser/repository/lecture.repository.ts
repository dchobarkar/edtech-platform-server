import { EntityRepository, Repository } from 'typeorm';
import { LectureEntity } from '../entity/lecture.entity';
import { CreateLectureDto } from '../dto/create-lecture.dto';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async getalllectures(): Promise<LectureEntity[]> {
    const query = this.createQueryBuilder('lecture');
    const getalllectures = await query.getMany();

    return getalllectures;
  }

  async createnewlecture(
    id,
    createlecturedto: CreateLectureDto,
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro, lecturevideo } = createlecturedto;

    const NewLecture = new LectureEntity();

    NewLecture.lecturetitle = lecturetitle;
    NewLecture.lectureintro = lectureintro;
    NewLecture.lecturevideo = lecturevideo;

    NewLecture.sectionentity = id;
    await NewLecture.save();
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
