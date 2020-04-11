import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLectureDto } from '../dto/create-lecture.dto';
import { LectureRepository } from '../../repository/lecture.repository';
import { LectureEntity } from '../../entity/lecture.entity';
import { AwsHelper } from 'src/utils/AwsHelper';
import { CourseRepository } from '../../repository/course.repository';
import { SectionRepository } from '../../repository/section.repository';
import { UserRepository } from 'src/auth/user.repository';

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
  ) { }

  async createNewLecture(
    id: string,
    createlecturedto: CreateLectureDto,
    video: any
  ): Promise<any> {
    const sectionData = await this.sectionRepository.findOne(id);
    const courseData = await this.courseRepository.findOne(sectionData.courseentityCourseId);
    const userData = await this.userRepository.findOne(courseData.userentityId)
    const folderPath = `${userData.classname}/${courseData.coursetitle}/${sectionData.sectiontitle}/${createlecturedto.lecturetitle}/${video.originalname}`
    const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);
    return this.lecturerepository.createnewlecture(id, createlecturedto, videoData.Location);
  }

  async updateLecture(
    id: string,
    createlecturedto: CreateLectureDto,
    video: any
  ): Promise<LectureEntity> {
    const ToBeUpdated = await this.getLectureById(id);
    const sectionData = await this.sectionRepository.findOne(ToBeUpdated.sectionentitySectionId);
    const courseData = await this.courseRepository.findOne(sectionData.courseentityCourseId);
    const userData = await this.userRepository.findOne(courseData.userentityId)
    const folderPath = `${userData.classname}/${courseData.coursetitle}/${sectionData.sectiontitle}/${createlecturedto.lecturetitle}/${video.originalname}`
    const videoData = await this.awsHelper.UPLOAD_VIDEO(video, folderPath);
    return this.lecturerepository.updatelecture(createlecturedto, ToBeUpdated, videoData.Location);
  }

  async getLectureById(id: string): Promise<LectureEntity> {
    const lecture = await this.lecturerepository.findOne(id);

    if (!lecture) {
      throw new NotFoundException(
        'The Lecture you are searching is not Present',
      );
    }

    return lecture;
  }

  async deleteLecture(id: string): Promise<void> {
    const deleted = await this.lecturerepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException('The Lecture to be deleted is not present');
    }
  }
}
