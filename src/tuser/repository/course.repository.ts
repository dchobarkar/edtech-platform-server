import { EntityRepository, Repository } from 'typeorm';
import { CourseEntity } from '../entity/course.entity';
import { CreateCourseDto } from '../dto/create-course.dto';

@EntityRepository(CourseEntity)
export class CourseRepository extends Repository<CourseEntity> {
  async getallcourses(): Promise<CourseEntity[]> {
    const query = this.createQueryBuilder('course');
    const getallcourses = await query.getMany();

    return getallcourses;
  }

  async createnewcourse(
    createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
    const {
      tuser_id,
      coursetitle,
      courseintro,
      targetaudience_id,
      subject_id,
      studentsenrolled,
      fee,
      rating,
      noofrating,
    } = createcoursedto;

    const NewCourse = new CourseEntity();

    NewCourse.tuser_id = tuser_id;
    NewCourse.coursetitle = coursetitle;
    NewCourse.courseintro = courseintro;
    NewCourse.targetaudience_id = targetaudience_id;
    NewCourse.subject_id = subject_id;
    NewCourse.studentsenrolled = studentsenrolled;
    NewCourse.fee = fee;
    NewCourse.rating = rating;
    NewCourse.noofrating = noofrating;

    await NewCourse.save();

    return NewCourse;
  }

  async updatecourse(
    createcoursedto: CreateCourseDto,
    ToBeUpdated: CourseEntity,
  ): Promise<CourseEntity> {
    const {
      tuser_id,
      coursetitle,
      courseintro,
      targetaudience_id,
      subject_id,
      studentsenrolled,
      fee,
      rating,
      noofrating,
    } = createcoursedto;

    ToBeUpdated.tuser_id = tuser_id;
    ToBeUpdated.coursetitle = coursetitle;
    ToBeUpdated.courseintro = courseintro;
    ToBeUpdated.targetaudience_id = targetaudience_id;
    ToBeUpdated.subject_id = subject_id;
    ToBeUpdated.studentsenrolled = studentsenrolled;
    ToBeUpdated.fee = fee;
    ToBeUpdated.rating = rating;
    ToBeUpdated.noofrating = noofrating;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
