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

  async getAllCourses(user: UserEntity): Promise<Object[]> {
    // get row courses data
    const tempcourses = await this.courseRepository.getallcourses(user);

    // return needed data
    let courses = [];
    tempcourses.map(course => {
      const tempcourse = {
        course_id: course.course_id,
        coursetitle: course.coursetitle,
        fee: course.fee,
        studentsenrolled: course.studentsenrolled,
        ratingpoint: course.ratingpoint,
        noofrating: course.noofrating,
        targetaudience: course.targetaudienceentity.targetaudience,
        subject: course.subjectentity.subject,
        created_at: course.created_at,
      };
      courses.push(tempcourse);
    });
    return courses;
  }

  async getAllSections(user: UserEntity, course_id: string): Promise<Object> {
    // get row sections data
    const tempsections = await this.courseRepository.getallsections(course_id);

    // return needed data
    const allsections = {
      course_id: tempsections.course_id,
      coursetitle: tempsections.coursetitle,
      courseintro: tempsections.courseintro,
      fee: tempsections.fee,
      studentsenrolled: tempsections.studentsenrolled,
      ratingpoint: tempsections.ratingpoint,
      noofrating: tempsections.noofrating,
      targetaudience_id: tempsections.targetaudienceentity.targetaudience_id,
      targetaudience: tempsections.targetaudienceentity.targetaudience,
      subject_id: tempsections.subjectentity.subject_id,
      subject: tempsections.subjectentity.subject,
      sections: tempsections.sectionentitys,
    };
    return allsections;
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
  ): Promise<Object> {
    // updatedcourse
    const tempupdatedcourse = await this.courseRepository.updatecourse(
      user,
      course_id,
      createCourseDto,
    );

    // return needed data
    const updatedcourse = {
      coursetitle: tempupdatedcourse.coursetitle,
      courseintro: tempupdatedcourse.courseintro,
      fee: tempupdatedcourse.fee,
      targetaudience_id: tempupdatedcourse.targetaudienceentityTargetaudienceId,
      subject_id: tempupdatedcourse.subjectentitySubjectId,
    };
    return updatedcourse;
  }

  async createNewTargetaudience(
    targetaudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courseRepository.createnewtargetaudience(targetaudience);
  }

  async createNewSubject(subject: string): Promise<SubjectEntity> {
    return this.courseRepository.createnewsubject(subject);
  }
}
