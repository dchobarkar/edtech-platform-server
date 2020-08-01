import { EntityRepository, Repository } from 'typeorm';
import {
  ForbiddenException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { UserEntity } from '../auth/user.entity';

import { CreateCourseDto } from './dto/create-course.dto';
import {
  CourseEntity,
  TargetAudienceEntity,
  SubjectEntity,
} from './course.entity';

@EntityRepository(CourseEntity)
export class CourseRepository extends Repository<CourseEntity> {
  async getallcourses(user: UserEntity): Promise<CourseEntity[]> {
    return this.find({
      where: { userentityId: user.id },
      relations: ['targetaudienceentity', 'subjectentity'],
      order: { created_at: 'DESC' },
    });
  }

  async getallsections(course_id: string): Promise<CourseEntity> {
    return this.findOne(
      { course_id: course_id },
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
  }

  async createnewcourse(
    user: UserEntity,
    createCourseDto: CreateCourseDto,
  ): Promise<string> {
    const {
      coursetitle,
      courseintro,
      targetaudience_id,
      subject_id,
      fee,
    } = createCourseDto;
    const NewCourse = new CourseEntity();
    NewCourse.coursetitle = coursetitle;
    NewCourse.courseintro = courseintro;
    NewCourse.fee = fee;
    NewCourse.studentsenrolled = 0;
    NewCourse.ratingpoint = 0;
    NewCourse.noofrating = 0;
    NewCourse.userentityId = user.id;
    NewCourse.targetaudienceentityTargetaudienceId = targetaudience_id;
    NewCourse.subjectentitySubjectId = subject_id;
    try {
      await NewCourse.save();
    } catch (error) {
      if (error.code === '23503') {
        console.log(error);
        throw new ForbiddenException();
      } else if (error.code === '22003') {
        throw new BadRequestException();
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    return NewCourse.course_id;
  }

  async updatecourse(
    user: UserEntity,
    course_id: string,
    createCourseDto: CreateCourseDto,
  ): Promise<CourseEntity> {
    const {
      coursetitle,
      courseintro,
      targetaudience_id,
      subject_id,
      fee,
    } = createCourseDto;

    // search for tobeupdated course
    let tobeupdatedcourse = await this.findOne({
      where: { course_id: course_id },
    });

    // update the course
    tobeupdatedcourse.coursetitle = coursetitle;
    tobeupdatedcourse.courseintro = courseintro;
    tobeupdatedcourse.fee = fee;
    tobeupdatedcourse.targetaudienceentityTargetaudienceId = targetaudience_id;
    tobeupdatedcourse.subjectentitySubjectId = subject_id;
    try {
      await tobeupdatedcourse.save();
    } catch (error) {
      if (error.code === '23503') {
        throw new ForbiddenException();
      } else if (error.code === '22003') {
        throw new BadRequestException();
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    return tobeupdatedcourse;
  }

  async createnewtargetaudience(
    targetaudience: string,
  ): Promise<TargetAudienceEntity> {
    const NewTargetAudience = new TargetAudienceEntity();
    NewTargetAudience.targetaudience = targetaudience;
    await NewTargetAudience.save();
    return NewTargetAudience;
  }

  async createnewsubject(subject: string): Promise<SubjectEntity> {
    const NewSubject = new SubjectEntity();
    NewSubject.subject = subject;
    await NewSubject.save();
    return NewSubject;
  }
}
