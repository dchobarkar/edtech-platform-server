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
    id,
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
    NewCourse.targetaudience_id = targetaudience_id;
    NewCourse.subject_id = subject_id;
    NewCourse.fee = fee;

    NewCourse.studentsenrolled = 0;
    NewCourse.rating = 0;
    NewCourse.noofrating = 0;

    NewCourse.tuserentity = id;

    await NewCourse.save();

    return NewCourse;
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
    ToBeUpdated.targetaudience_id = targetaudience_id;
    ToBeUpdated.subject_id = subject_id;
    ToBeUpdated.fee = fee;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
