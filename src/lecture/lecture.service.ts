import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../auth/user.repository';

import { CourseRepository } from '../course/course.repository';

import { SectionRepository } from '../section/section.repository';

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureRepository } from './lecture.repository';

import { AwsHelper } from '../utils/AwsHelper';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    @InjectRepository(CourseRepository)
    @InjectRepository(SectionRepository)
    @InjectRepository(UserRepository)
    private lectureRepository: LectureRepository,
    private courseRepository: CourseRepository,
    private sectionRepository: SectionRepository,
    private userRepository: UserRepository,
    private awsHelper: AwsHelper,
  ) {}

  async createNewLecture(
    section_id: string,
    createLectureDto: CreateLectureDto,
    video: any,
  ): Promise<object> {
    // upload video to aws
    if (!video) {
      throw new NotAcceptableException();
    }
    const sectionData = await this.sectionRepository.findOne(section_id);
    const courseData = await this.courseRepository.findOne(
      sectionData.courseEntityCourseId,
    );
    const userData = await this.userRepository.findOne(courseData.userEntityId);
    const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${createLectureDto.lectureTitle}`;
    const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);

    // create new lecture
    const tempNewLecture = await this.lectureRepository.createnewlecture(
      section_id,
      createLectureDto,
      videoData.Location,
    );

    // return needed data
    const newLecture = {
      lecture_id: tempNewLecture.lecture_id,
      lectureTitle: tempNewLecture.lectureTitle,
      lectureIntro: tempNewLecture.lectureIntro,
      lectureVideo: tempNewLecture.lectureVideo,
    };
    return newLecture;
  }

  async updateLecture(
    lecture_id: string,
    createLectureDto: CreateLectureDto,
    video: any,
  ): Promise<object> {
    // search tobeupdated lecture
    const toBeUpdatedLecture = await this.lectureRepository.getlecturebyid(
      lecture_id,
    );

    // upload video to the aws
    let videoUrl = toBeUpdatedLecture.lectureVideo;
    if (video) {
      const sectionData = await this.sectionRepository.findOne(
        toBeUpdatedLecture.sectionEntitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseEntityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userEntityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${createLectureDto.lectureTitle}`;
      const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);
      videoUrl = videoData.Location;
    }

    // update lecture
    const tempUpdatedLecture = await this.lectureRepository.updatelecture(
      createLectureDto,
      toBeUpdatedLecture,
      videoUrl,
    );

    // Return needed data
    const updatedLecture = {
      lectureTitle: tempUpdatedLecture.lectureTitle,
      lectureIntro: tempUpdatedLecture.lectureIntro,
      lectureVideo: tempUpdatedLecture.lectureVideo,
    };
    return updatedLecture;
  }

  async deleteLecture(lecture_id: string): Promise<void> {
    return this.lectureRepository.deletelecture(lecture_id);
  }
}
