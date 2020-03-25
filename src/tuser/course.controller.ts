import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseEntity } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('/course')
export class CourseController {
  constructor(private courseservice: CourseService) {}

  @Get()
  getAllCourses(): Promise<CourseEntity[]> {
    return this.courseservice.getAllCourses();
  }

  @Get('/:id')
  getCourseById(@Param('id') id: string): Promise<CourseEntity> {
    return this.courseservice.getCourseById(id);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewCourse(
    @Param('id') id,
    @Body() createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
    return this.courseservice.createNewCourse(id, createcoursedto);
  }

  @Delete('/:id')
  deletecourse(@Param('id') id: string): Promise<void> {
    return this.courseservice.deleteCourse(id);
  }

  @Patch('/:id/update')
  updateCourse(
    @Param('id') id: string,
    @Body() createcoursedto: CreateCourseDto,
  ): Promise<CourseEntity> {
    return this.courseservice.updateCourse(id, createcoursedto);
  }
}
