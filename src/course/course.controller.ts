import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../auth/user.entity';

import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { TargetAudienceEntity, SubjectEntity } from './course.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('course')
@UseGuards(AuthGuard())
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  getAllCourses(@GetUser() user: UserEntity): Promise<Object[]> {
    return this.courseService.getAllCourses(user);
  }

  @Get('/:id/allsections')
  getAllSections(
    @GetUser() user: UserEntity,
    @Param('id') course_id: string,
  ): Promise<Object> {
    return this.courseService.getAllSections(user, course_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewCourse(
    @GetUser() user: UserEntity,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<string> {
    return this.courseService.createNewCourse(user, createCourseDto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateCourse(
    @GetUser() user: UserEntity,
    @Param('id') course_id: string,
    @Body() createcoursedto: CreateCourseDto,
  ): Promise<Object> {
    return this.courseService.updateCourse(user, course_id, createcoursedto);
  }

  // only to be used while adding new target audience or subject
  @Post('/targetaudience')
  createNewTargetaudience(
    @Body('targetaudience') targetaudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courseService.createNewTargetaudience(targetaudience);
  }

  @Post('/subject')
  createNewSubject(@Body('subject') subject: string): Promise<SubjectEntity> {
    return this.courseService.createNewSubject(subject);
  }
}
