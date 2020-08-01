import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureEntity } from './lecture.entity';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async createnewlecture(
    section_id: string,
    createLectureDto: CreateLectureDto,
    videoUrl: string,
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro } = createLectureDto;
    const NewLecture = new LectureEntity();
    NewLecture.lecturetitle = lecturetitle;
    NewLecture.lectureintro = lectureintro;
    NewLecture.lecturevideo = videoUrl;
    NewLecture.sectionentitySectionId = section_id;
    await NewLecture.save();
    return NewLecture;
  }

  async getlecturebyid(lecture_id: string): Promise<LectureEntity> {
    return this.findOne(lecture_id);
  }

  async updatelecture(
    createLectureDto: CreateLectureDto,
    tobeupdatedlectue: LectureEntity,
    videoUrl: string,
  ): Promise<LectureEntity> {
    const { lecturetitle, lectureintro } = createLectureDto;
    tobeupdatedlectue.lecturetitle = lecturetitle;
    tobeupdatedlectue.lectureintro = lectureintro;
    tobeupdatedlectue.lecturevideo = videoUrl;
    await tobeupdatedlectue.save();
    return tobeupdatedlectue;
  }

  async deletelecture(lecture_id: string): Promise<void> {
    const deleted = await this.delete(lecture_id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
