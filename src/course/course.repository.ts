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
      where: { userEntityId: user.id },
      relations: ['targetAudienceEntity', 'subjectEntity'],
      order: { created_at: 'DESC' },
    });
  }

  async getallsections(course_id: string): Promise<CourseEntity> {
    return this.findOne(
      { course_id: course_id },
      {
        relations: [
          'targetAudienceEntity',
          'subjectEntity',
          'sectionEntitys',
          'sectionEntitys.lectureEntitys',
          'sectionEntitys.examEntitys',
        ],
      },
    );
  }

  async createnewcourse(
    user: UserEntity,
    createCourseDto: CreateCourseDto,
  ): Promise<string> {
    const {
      courseTitle,
      courseIntro,
      targetAudience_id,
      subject_id,
      fee,
    } = createCourseDto;
    const newCourse = new CourseEntity();
    newCourse.courseTitle = courseTitle;
    newCourse.courseIntro = courseIntro;
    newCourse.fee = fee;
    newCourse.studentsEnrolled = 0;
    newCourse.ratingPoint = 0;
    newCourse.noOfRating = 0;
    newCourse.userEntityId = user.id;
    newCourse.targetAudienceEntityTargetAudienceId = targetAudience_id;
    newCourse.subjectEntitySubjectId = subject_id;
    try {
      await newCourse.save();
    } catch (error) {
      if (error.code === '23503') {
        console.log(`Error in createnewcourse\n${createCourseDto}\n${error}`);
        throw new ForbiddenException();
      } else if (error.code === '22003') {
        throw new BadRequestException();
      } else {
        console.log(`Error in createnewcourse\n${createCourseDto}\n${error}`);
        throw new InternalServerErrorException();
      }
    }
    return newCourse.course_id;
  }

  async updatecourse(
    user: UserEntity,
    course_id: string,
    createCourseDto: CreateCourseDto,
  ): Promise<CourseEntity> {
    const {
      courseTitle,
      courseIntro,
      targetAudience_id,
      subject_id,
      fee,
    } = createCourseDto;

    // search for tobeupdated course
    let toBeUpdatedCourse = await this.findOne({
      where: { course_id: course_id },
    });

    // update the course
    toBeUpdatedCourse.courseTitle = courseTitle;
    toBeUpdatedCourse.courseIntro = courseIntro;
    toBeUpdatedCourse.fee = fee;
    toBeUpdatedCourse.targetAudienceEntityTargetAudienceId = targetAudience_id;
    toBeUpdatedCourse.subjectEntitySubjectId = subject_id;
    try {
      await toBeUpdatedCourse.save();
    } catch (error) {
      if (error.code === '23503') {
        console.log(`Error in updatecourse\n${createCourseDto}\n${error}`);
        throw new ForbiddenException();
      } else if (error.code === '22003') {
        throw new BadRequestException();
      } else {
        console.log(`Error in updatecourse\n${createCourseDto}\n${error}`);
        throw new InternalServerErrorException();
      }
    }
    return toBeUpdatedCourse;
  }

  async createnewtargetaudience(
    targetAudience: string,
  ): Promise<TargetAudienceEntity> {
    const newTargetAudience = new TargetAudienceEntity();
    newTargetAudience.targetAudience = targetAudience;
    await newTargetAudience.save();
    return newTargetAudience;
  }

  async createnewsubject(subject: string): Promise<SubjectEntity> {
    const newSubject = new SubjectEntity();
    newSubject.subject = subject;
    await newSubject.save();
    return newSubject;
  }
}
