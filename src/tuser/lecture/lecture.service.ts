import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLectureDto } from '../dto/create-lecture.dto';
import { LectureEntity } from '../../entity/lecture.entity';
import { UserRepository } from 'src/auth/user.repository';
import { CourseRepository } from '../../repository/course.repository';
import { SectionRepository } from '../../repository/section.repository';
import { LectureRepository } from '../../repository/lecture.repository';

import { AwsHelper } from 'src/utils/AwsHelper';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    @InjectRepository(CourseRepository)
    @InjectRepository(SectionRepository)
    @InjectRepository(UserRepository)
    private lecturerepository: LectureRepository,
    private courseRepository: CourseRepository,
    private sectionRepository: SectionRepository,
    private userRepository: UserRepository,
    private awsHelper: AwsHelper,
  ) {}

  async createNewLecture(
    id: string,
    createlecturedto: CreateLectureDto,
    video: any,
  ): Promise<Object> {
    if (!video) {
      throw new NotAcceptableException();
    }
    const sectionData = await this.sectionRepository.findOne(id);
    const courseData = await this.courseRepository.findOne(
      sectionData.courseentityCourseId,
    );
    const userData = await this.userRepository.findOne(courseData.userentityId);
    const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${createlecturedto.lecturetitle}`;
    const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);
    const NewLecture = await this.lecturerepository.createnewlecture(
      id,
      createlecturedto,
      videoData.Location,
    );
    const newLecture = {
      lecture_id: NewLecture.lecture_id,
      lecturetitle: NewLecture.lecturetitle,
      lectureintro: NewLecture.lectureintro,
      lecturevideo: NewLecture.lecturevideo,
    };
    return newLecture;
  }

  async updateLecture(
    id: string,
    createlecturedto: CreateLectureDto,
    video: any,
  ): Promise<Object> {
    const ToBeUpdated = await this.getLectureById(id);
    let videoUrl = ToBeUpdated.lecturevideo;
    if (video) {
      const sectionData = await this.sectionRepository.findOne(
        ToBeUpdated.sectionentitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseentityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userentityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${createlecturedto.lecturetitle}`;
      const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);
      videoUrl = videoData.Location;
    }
    const UpdatedLecture = await this.lecturerepository.updatelecture(
      createlecturedto,
      ToBeUpdated,
      videoUrl,
    );
    const updatedLecture = {
      lecture_id: UpdatedLecture.lecture_id,
      lecturetitle: UpdatedLecture.lecturetitle,
      lectureintro: UpdatedLecture.lectureintro,
      lecturevideo: UpdatedLecture.lecturevideo,
    };
    return updatedLecture;
  }

  async getLectureById(id: string): Promise<LectureEntity> {
    const lecture = await this.lecturerepository.findOne(id);
    if (!lecture) {
      throw new NotFoundException('Unknown Lecture');
    }
    return lecture;
  }

  async deleteLecture(id: string): Promise<void> {
    const deleted = await this.lecturerepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
