import { EntityRepository, Repository } from 'typeorm';

import { CreateCourseDto } from '../tuser/dto/create-course.dto';
import { UserEntity } from '../auth/user.entity';
import {
  CourseEntity,
  TargetAudienceEntity,
  SubjectEntity,
} from '../entity/course.entity';
import {
  ForbiddenException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

@EntityRepository(CourseEntity)
export class CourseRepository extends Repository<CourseEntity> {
  async createnewcourse(
    user: UserEntity,
    createcoursedto: CreateCourseDto,
  ): Promise<string> {
    const today = new Date();
    const date =
      today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const createdat = date + ' ' + time;
    const {
      coursetitle,
      courseintro,
      targetaudience_id,
      subject_id,
      fee,
    } = createcoursedto;
    const NewCourse = new CourseEntity();
    NewCourse.coursetitle = coursetitle;
    NewCourse.courseintro = courseintro;
    NewCourse.fee = fee;
    NewCourse.studentsenrolled = 0;
    NewCourse.ratingpoint = 0;
    NewCourse.noofrating = 0;
    NewCourse.created = createdat;
    NewCourse.userentityId = user.id;
    NewCourse.targetaudienceentityTargetaudienceId = targetaudience_id;
    NewCourse.subjectentitySubjectId = subject_id;
    try {
      await NewCourse.save();
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
    return NewCourse.course_id;
  }

  async getallcourses(user: UserEntity): Promise<CourseEntity[]> {
    const query = this.createQueryBuilder('course');
    query.where('course.userentityId=:userId', { userId: user.id });
    query.leftJoinAndSelect(
      'course.targetaudienceentity',
      'targetaudienceentity',
    );
    query.leftJoinAndSelect('course.subjectentity', 'subjectentity');
    const courses = await query.getMany();
    function compare(a, b) {
      if (a.created < b.created) {
        return -1;
      }
      if (a.created > b.created) {
        return 1;
      }
      return 0;
    }
    courses.sort(compare);
    return courses;
  }

  async updatecourse(
    createcoursedto: CreateCourseDto,
    ToBeUpdated: CourseEntity,
  ): Promise<string> {
    const {
      coursetitle,
      courseintro,
      targetaudience_id,
      subject_id,
      fee,
    } = createcoursedto;
    ToBeUpdated.coursetitle = coursetitle;
    ToBeUpdated.courseintro = courseintro;
    ToBeUpdated.fee = fee;
    ToBeUpdated.targetaudienceentityTargetaudienceId = targetaudience_id;
    ToBeUpdated.subjectentitySubjectId = subject_id;
    try {
      await ToBeUpdated.save();
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
    return ToBeUpdated.course_id;
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
