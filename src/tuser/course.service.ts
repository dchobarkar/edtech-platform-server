import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './repository/course.repository';
import { CourseEntity } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courserepository: CourseRepository,
  ) {}

  async getAllCourses(): Promise<CourseEntity[]> {
    return this.courserepository.getallcourses();
  }

  async getCourseById(id: string): Promise<CourseEntity> {
    const found = await this.courserepository.findOne(id);

    if (!found) {
      throw new NotFoundException(
        'The Course you are searching is not Present',
      );
    }

    return found;
  }

  async createNewCourse(
    createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
    return this.courserepository.createnewcourse(createcoursedto);
  }

  async deleteCourse(id: string): Promise<void> {
    const result = await this.courserepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }

  async updateCourse(
    id: string,
    createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
    const ToBeUpdated = await this.getCourseById(id);
    return this.courserepository.updatecourse(createcoursedto, ToBeUpdated);
  }
}
