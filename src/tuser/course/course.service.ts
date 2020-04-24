import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseRepository } from '../../repository/course.repository';
import {
  CourseEntity,
  TargetAudienceEntity,
  SubjectEntity,
} from '../../entity/course.entity';
import { UserEntity } from '../../auth/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courserepository: CourseRepository,
  ) {}

  async createNewCourse(
    user: UserEntity,
    createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
    return this.courserepository.createnewcourse(user, createcoursedto);
  }

  async getAllCourses(user: UserEntity): Promise<CourseEntity[]> {
    return this.courserepository.getallcourses(user);
  }

  // async updateCourse(
  //   user: UserEntity,
  //   id: string,
  //   createcoursedto: CreateCourseDto,
  // ): Promise<CourseEntity> {
  //   const ToBeUpdated = await this.getCourseById(user, id);
  //   return this.courserepository.updatecourse(createcoursedto, ToBeUpdated);
  // }

  // async getCourseById(user: UserEntity, id: string): Promise<CourseEntity> {
  //   const course = await this.courserepository.findOne({
  //     where: { course_id: id, userentityId: user.id },
  //   });

  //   if (!course) {
  //     throw new NotFoundException(
  //       'The Course you are searching is not Present',
  //     );
  //   }
  //   return course;
  // }

  // async getAllSections(user: UserEntity, id: string): Promise<CourseEntity> {
  //   const course = await this.getCourseById(user, id);
  //   const sections = await this.courserepository.findOne(
  //     { course_id: course.course_id },
  //     {
  //       relations: [
  //         'sectionentitys',
  //         'sectionentitys.lectureentitys',
  //         'sectionentitys.examentitys',
  //       ],
  //     },
  //   );

  //   return sections;
  // }

  async createNewTargetaudience(
    targetaudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courserepository.createnewtargetaudience(targetaudience);
  }

  async createNewSubject(subject: string): Promise<SubjectEntity> {
    return this.courserepository.createnewsubject(subject);
  }
}
