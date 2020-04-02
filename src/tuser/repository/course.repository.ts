import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseEntity } from '../entity/course.entity';
import { UserEntity } from '../../auth/user.entity';

@EntityRepository(CourseEntity)
export class CourseRepository extends Repository<CourseEntity> {
  async createnewcourse(
    user: UserEntity,
    createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
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

    NewCourse.userentityId = user.id;
    NewCourse.targetaudience_id = targetaudience_id;
    NewCourse.subject_id = subject_id;

    try {
      await NewCourse.save();
    } catch (error) {
      if (error.code === '23502') {
        throw new InternalServerErrorException(
          'Please provide all information',
        );
      } else if (error.code === '22001') {
        throw new InternalServerErrorException('Value too long for given type');
      } else {
        throw new InternalServerErrorException('Unknown');
      }
    }
    delete NewCourse.userentityId;

    return NewCourse;
  }

  async getallcourses(user: UserEntity): Promise<CourseEntity[]> {
    const query = this.createQueryBuilder('course');
    query.where('course.userentityId=:userId', { userId: user.id });
    const courses = await query.getMany();
    return courses;
  }

  async updatecourse(
    createcoursedto: CreateCourseDto,
    ToBeUpdated: CourseEntity,
  ): Promise<CourseEntity> {
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

    ToBeUpdated.targetaudience_id = targetaudience_id;
    ToBeUpdated.subject_id = subject_id;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
