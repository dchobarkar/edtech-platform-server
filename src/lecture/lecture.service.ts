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
  ): Promise<Object> {
    // upload video to aws
    if (!video) {
      throw new NotAcceptableException();
    }
    const sectionData = await this.sectionRepository.findOne(section_id);
    const courseData = await this.courseRepository.findOne(
      sectionData.courseentityCourseId,
    );
    const userData = await this.userRepository.findOne(courseData.userentityId);
    const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${createLectureDto.lecturetitle}`;
    const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);

    // create new lecture
    const tempnewlecture = await this.lectureRepository.createnewlecture(
      section_id,
      createLectureDto,
      videoData.Location,
    );

    // return needed data
    const newlecture = {
      lecture_id: tempnewlecture.lecture_id,
      lecturetitle: tempnewlecture.lecturetitle,
      lectureintro: tempnewlecture.lectureintro,
      lecturevideo: tempnewlecture.lecturevideo,
    };
    return newlecture;
  }

  async updateLecture(
    lecture_id: string,
    createLectureDto: CreateLectureDto,
    video: any,
  ): Promise<Object> {
    // search tobeupdated lecture
    const tobeupdatedlecture = await this.lectureRepository.getlecturebyid(
      lecture_id,
    );

    // upload video to the aws
    let videoUrl = tobeupdatedlecture.lecturevideo;
    if (video) {
      const sectionData = await this.sectionRepository.findOne(
        tobeupdatedlecture.sectionentitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseentityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userentityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${createLectureDto.lecturetitle}`;
      const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);
      videoUrl = videoData.Location;
    }

    // update lecture
    const tempupdatedlecture = await this.lectureRepository.updatelecture(
      createLectureDto,
      tobeupdatedlecture,
      videoUrl,
    );

    // Return needed data
    const updatedlecture = {
      lecturetitle: tempupdatedlecture.lecturetitle,
      lectureintro: tempupdatedlecture.lectureintro,
      lecturevideo: tempupdatedlecture.lecturevideo,
    };
    return updatedlecture;
  }

  async deleteLecture(lecture_id: string): Promise<void> {
    return this.lectureRepository.deletelecture(lecture_id);
  }
}
