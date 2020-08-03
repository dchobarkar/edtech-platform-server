import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../auth/user.entity';

import { CreateCourseDto } from './dto/create-course.dto';
import { CourseRepository } from './course.repository';
import { TargetAudienceEntity, SubjectEntity } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async getAllCourses(user: UserEntity): Promise<object[]> {
    // get row courses data
    const tempCourses = await this.courseRepository.getallcourses(user);

    // return needed data
    let courses = [];
    tempCourses.map(course => {
      const tempCourse = {
        course_id: course.course_id,
        courseTitle: course.courseTitle,
        fee: course.fee,
        studentsEnrolled: course.studentsEnrolled,
        ratingPoint: course.ratingPoint,
        noOfRating: course.noOfRating,
        targetAudience: course.targetAudienceEntity.targetAudience,
        subject: course.subjectEntity.subject,
        created_at: course.created_at,
      };
      courses.push(tempCourse);
    });
    return courses;
  }

  async getAllSections(user: UserEntity, course_id: string): Promise<object> {
    // get row sections data
    const tempSections = await this.courseRepository.getallsections(course_id);

    // return needed data
    const allSections = {
      course_id: tempSections.course_id,
      courseTitle: tempSections.courseTitle,
      courseIntro: tempSections.courseIntro,
      fee: tempSections.fee,
      studentsEnrolled: tempSections.studentsEnrolled,
      ratingPoint: tempSections.ratingPoint,
      noOfRating: tempSections.noOfRating,
      targetAudience_id: tempSections.targetAudienceEntity.targetAudience_id,
      targetAudience: tempSections.targetAudienceEntity.targetAudience,
      subject_id: tempSections.subjectEntity.subject_id,
      subject: tempSections.subjectEntity.subject,
      sections: tempSections.sectionEntitys,
    };
    return allSections;
  }

  async createNewCourse(
    user: UserEntity,
    createCourseDto: CreateCourseDto,
  ): Promise<string> {
    return this.courseRepository.createnewcourse(user, createCourseDto);
  }

  async updateCourse(
    user: UserEntity,
    course_id: string,
    createCourseDto: CreateCourseDto,
  ): Promise<object> {
    // updatedcourse
    const tempUpdatedCourse = await this.courseRepository.updatecourse(
      user,
      course_id,
      createCourseDto,
    );

    // return needed data
    const updatedCourse = {
      courseTitle: tempUpdatedCourse.courseTitle,
      courseIntro: tempUpdatedCourse.courseIntro,
      fee: tempUpdatedCourse.fee,
      targetAudience_id: tempUpdatedCourse.targetAudienceEntityTargetAudienceId,
      subject_id: tempUpdatedCourse.subjectEntitySubjectId,
    };
    return updatedCourse;
  }

  async createNewTargetaudience(
    targetAudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courseRepository.createnewtargetaudience(targetAudience);
  }

  async createNewSubject(subject: string): Promise<SubjectEntity> {
    return this.courseRepository.createnewsubject(subject);
  }
}
