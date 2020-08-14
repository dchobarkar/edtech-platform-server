import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureEntity } from './lecture.entity';

@EntityRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  // Create new lecture from database
  async createnewlecture(
    section_id: string,
    createLectureDto: CreateLectureDto,
    videoUrl: string,
  ): Promise<LectureEntity> {
    const { lectureTitle, lectureIntro } = createLectureDto;
    const newLecture = new LectureEntity();
    newLecture.lectureTitle = lectureTitle;
    newLecture.lectureIntro = lectureIntro;
    newLecture.lectureVideo = videoUrl;
    newLecture.sectionEntitySectionId = section_id;
    await newLecture.save();
    return newLecture;
  }

  // Get lecture of given id from database
  async getlecturebyid(lecture_id: string): Promise<LectureEntity> {
    return this.findOne(lecture_id);
  }

  // Update given lecture from database
  async updatelecture(
    createLectureDto: CreateLectureDto,
    toBeUpdatedLectue: LectureEntity,
    videoUrl: string,
  ): Promise<LectureEntity> {
    const { lectureTitle, lectureIntro } = createLectureDto;
    toBeUpdatedLectue.lectureTitle = lectureTitle;
    toBeUpdatedLectue.lectureIntro = lectureIntro;
    toBeUpdatedLectue.lectureVideo = videoUrl;
    await toBeUpdatedLectue.save();
    return toBeUpdatedLectue;
  }

  // Delete given lecture
  async deletelecture(lecture_id: string): Promise<void> {
    const deletedLecture = await this.delete(lecture_id);
    if (deletedLecture.affected === 0) {
      throw new NotFoundException();
    }
  }
}
