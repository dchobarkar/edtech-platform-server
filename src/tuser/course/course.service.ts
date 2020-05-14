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
    const courseId = await this.courserepository.createnewcourse(
      user,
      createcoursedto,
    );
    const NewCourse = await this.courserepository.findOne(
      { course_id: courseId },
      {
        relations: ['targetaudienceentity', 'subjectentity'],
      },
    );
    const newCourse = {
      course_id: NewCourse.course_id,
      coursetitle: NewCourse.coursetitle,
      fee: NewCourse.fee,
      studentsenrolled: NewCourse.studentsenrolled,
      ratingpoint: NewCourse.ratingpoint,
      noofrating: NewCourse.noofrating,
      created_at: NewCourse.created_at,
      targetaudience: NewCourse.targetaudienceentity.targetaudience,
      subject: NewCourse.subjectentity.subject,
    };
    return newCourse;
  }

  async getAllCourses(user: UserEntity): Promise<Object[]> {
    const Courses = await this.courserepository.getallcourses(user);
    let courses = [];
    Courses.map(course => {
      const tempcourse = {
        course_id: course.course_id,
        coursetitle: course.coursetitle,
        fee: course.fee,
        studentsenrolled: course.studentsenrolled,
        ratingpoint: course.ratingpoint,
        noofrating: course.noofrating,
        created_at: course.created_at,
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
    const courseId = await this.courserepository.updatecourse(
      createcoursedto,
      ToBeUpdated,
    );
    const UpdatedCourse = await this.courserepository.findOne(
      { course_id: courseId },
      {
        relations: ['targetaudienceentity', 'subjectentity'],
      },
    );
    const updatedCourse = {
      course_id: UpdatedCourse.course_id,
      coursetitle: UpdatedCourse.coursetitle,
      courseintro: UpdatedCourse.courseintro,
      fee: UpdatedCourse.fee,
      targetaudience_id: UpdatedCourse.targetaudienceentity.targetaudience_id,
      targetaudience: UpdatedCourse.targetaudienceentity.targetaudience,
      subject_id: UpdatedCourse.subjectentity.subject_id,
      subject: UpdatedCourse.subjectentity.subject,
    };
    return updatedCourse;
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
    const Sections = await this.courserepository.findOne(
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
      course_id: Sections.course_id,
      coursetitle: Sections.coursetitle,
      courseintro: Sections.courseintro,
      fee: Sections.fee,
      studentsenrolled: Sections.studentsenrolled,
      ratingpoint: Sections.ratingpoint,
      noofrating: Sections.noofrating,
      targetaudience_id: Sections.targetaudienceentity.targetaudience_id,
      targetaudience: Sections.targetaudienceentity.targetaudience,
      subject_id: Sections.subjectentity.subject_id,
      subject: Sections.subjectentity.subject,
      sections: Sections.sectionentitys,
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
