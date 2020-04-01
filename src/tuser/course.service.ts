import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './repository/course.repository';
import { CourseEntity } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courserepository: CourseRepository,
  ) {}

  async getAllCourses(user: UserEntity): Promise<CourseEntity[]> {
    return this.courserepository.getallcourses(user);
  }

  async getCourseById(id: string, user: UserEntity): Promise<CourseEntity> {
    const found = await this.courserepository.findOne({
      where: { course_id: id, userentityId: user.id },
    });

    if (!found) {
      throw new NotFoundException(
        'The Course you are searching is not Present',
      );
    }

    return found;
  }

  async createNewCourse(
    createcoursedto: CreateCourseDto,
    user: UserEntity,
  ): Promise<CourseEntity> {
    return this.courserepository.createnewcourse(createcoursedto, user);
  }

  async deleteCourse(id: string, user: UserEntity): Promise<void> {
    const result = await this.courserepository.delete({
      course_id: id,
      userentityId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }

  async updateCourse(
    id: string,
    createcoursedto: CreateCourseDto,
    user: UserEntity,
  ): Promise<CourseEntity> {
    const ToBeUpdated = await this.getCourseById(id, user);
    return this.courserepository.updatecourse(createcoursedto, ToBeUpdated);
  }

  async getAllSections(id: string, user: UserEntity) {
    // console.log(id, user);
    const course = await this.getCourseById(id, user);
    const sections = await this.courserepository.findOne(
      { course_id: course.course_id },
      {
        relations: [
          'sectionentitys',
          'sectionentitys.lectureentitys',
          'sectionentitys.examentitys',
        ],
      },
    );
    return sections;
  }

  async getAllQuestions(id: string, qid: string, user: UserEntity) {
    const course = await this.getCourseById(id, user);
    const exams = await this.courserepository.findOne(
      { course_id: course.course_id },
      {
        relations: [
          'sectionentitys',
          'sectionentitys.examentitys',
          'sectionentitys.examentitys.questionentitys',
        ],
      },
    );

    const pre = exams.sectionentitys[0].examentitys[0];

    return pre;
  }
}
