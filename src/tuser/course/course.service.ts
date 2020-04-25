import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseRepository } from '../../repository/course.repository';
import { UserEntity } from '../../auth/user.entity';
import {
  CourseEntity,
  TargetAudienceEntity,
  SubjectEntity,
} from '../../entity/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courserepository: CourseRepository,
  ) {}

  async createNewCourse(
    user: UserEntity,
    createcoursedto: CreateCourseDto,
  ): Promise<Object> {
    const courseid = await this.courserepository.createnewcourse(
      user,
      createcoursedto,
    );
    const FullNewCourse = await this.courserepository.findOne(
      { course_id: courseid },
      {
        relations: ['targetaudienceentity', 'subjectentity'],
      },
    );
    const newCourse = {
      course_id: FullNewCourse.course_id,
      coursetitle: FullNewCourse.coursetitle,
      fee: FullNewCourse.fee,
      studentsenrolled: FullNewCourse.studentsenrolled,
      ratingpoint: FullNewCourse.ratingpoint,
      noofrating: FullNewCourse.noofrating,
      created: FullNewCourse.created,
      targetaudience: FullNewCourse.targetaudienceentity.targetaudience,
      subject: FullNewCourse.subjectentity.subject,
    };
    return newCourse;
  }

  async getAllCourses(user: UserEntity): Promise<Object[]> {
    const Fullcourses = await this.courserepository.getallcourses(user);
    let courses = [];
    Fullcourses.map(course => {
      const tempcourse = {
        course_id: course.course_id,
        coursetitle: course.coursetitle,
        fee: course.fee,
        studentsenrolled: course.studentsenrolled,
        ratingpoint: course.ratingpoint,
        noofrating: course.noofrating,
        created: course.created,
        targetaudience: course.targetaudienceentity.targetaudience,
        subject: course.subjectentity.subject,
      };
      courses.push(tempcourse);
    });
    return courses;
  }

  async updateCourse(
    user: UserEntity,
    id: string,
    createcoursedto: CreateCourseDto,
  ): Promise<Object> {
    const ToBeUpdated = await this.getCourseById(user, id);
    const courseid = await this.courserepository.updatecourse(
      createcoursedto,
      ToBeUpdated,
    );
    const FullUpdatedCourse = await this.courserepository.findOne(
      { course_id: courseid },
      {
        relations: ['targetaudienceentity', 'subjectentity'],
      },
    );
    const UpdatedCourse = {
      course_id: FullUpdatedCourse.course_id,
      coursetitle: FullUpdatedCourse.coursetitle,
      courseintro: FullUpdatedCourse.courseintro,
      fee: FullUpdatedCourse.fee,
      targetaudience_id:
        FullUpdatedCourse.targetaudienceentity.targetaudience_id,
      targetaudience: FullUpdatedCourse.targetaudienceentity.targetaudience,
      subject_id: FullUpdatedCourse.subjectentity.subject_id,
      subject: FullUpdatedCourse.subjectentity.subject,
    };
    return UpdatedCourse;
  }

  async getCourseById(user: UserEntity, id: string): Promise<CourseEntity> {
    const course = await this.courserepository.findOne({
      where: { course_id: id, userentityId: user.id },
    });
    if (!course) {
      throw new NotFoundException('Unknown Course');
    }
    return course;
  }

  async getAllSections(user: UserEntity, id: string): Promise<Object> {
    const course = await this.getCourseById(user, id);
    const Fullsections = await this.courserepository.findOne(
      { course_id: course.course_id },
      {
        relations: [
          'targetaudienceentity',
          'subjectentity',
          'sectionentitys',
          'sectionentitys.lectureentitys',
          'sectionentitys.examentitys',
        ],
      },
    );
    const sections = {
      course_id: Fullsections.course_id,
      coursetitle: Fullsections.coursetitle,
      courseintro: Fullsections.courseintro,
      fee: Fullsections.fee,
      studentsenrolled: Fullsections.studentsenrolled,
      ratingpoint: Fullsections.ratingpoint,
      noofrating: Fullsections.noofrating,
      targetaudience_id: Fullsections.targetaudienceentity.targetaudience_id,
      targetaudience: Fullsections.targetaudienceentity.targetaudience,
      subject_id: Fullsections.subjectentity.subject_id,
      subject: Fullsections.subjectentity.subject,
      sections: Fullsections.sectionentitys,
    };
    return sections;
  }

  async createNewTargetaudience(
    targetaudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courserepository.createnewtargetaudience(targetaudience);
  }

  async createNewSubject(subject: string): Promise<SubjectEntity> {
    return this.courserepository.createnewsubject(subject);
  }
}
