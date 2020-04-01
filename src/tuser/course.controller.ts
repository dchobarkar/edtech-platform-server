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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CourseService } from './course.service';
import { CourseEntity } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('/course')
@UseGuards(AuthGuard())
export class CourseController {
  private logger = new Logger('CourseController');
  constructor(private courseservice: CourseService) {}

  @Get()
  getAllCourses(@GetUser() user: UserEntity): Promise<CourseEntity[]> {
    this.logger.verbose('User' + { user } + 'retrieving all courses');
    return this.courseservice.getAllCourses(user);
  }

  @Get('/:id')
  getCourseById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<CourseEntity> {
    return this.courseservice.getCourseById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewCourse(
    @Body() createcoursedto: CreateCourseDto,
    @GetUser() user: UserEntity,
  ): Promise<CourseEntity> {
    return this.courseservice.createNewCourse(createcoursedto, user);
  }

  @Delete('/:id')
  deletecourse(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.courseservice.deleteCourse(id, user);
  }

  @Patch('/:id/update')
  updateCourse(
    @Param('id') id: string,
    @Body() createcoursedto: CreateCourseDto,
    @GetUser() user: UserEntity,
  ): Promise<CourseEntity> {
    return this.courseservice.updateCourse(id, createcoursedto, user);
  }

  @Get('/:id/allsections')
  getAllSections(@Param('id') id: string, @GetUser() user: UserEntity) {
    return this.courseservice.getAllSections(id, user);
  }

  @Get('/:id/allquestions/:eid')
  geAllQuestions(
    @Param('id') id: string,
    @Param('eid') eid: string,
    @GetUser() user: UserEntity,
  ) {
    return this.courseservice.getAllQuestions(id, eid, user);
  }
}
