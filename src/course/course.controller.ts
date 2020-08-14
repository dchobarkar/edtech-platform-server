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

  // Get all courses of current user
  @Get()
  getAllCourses(@GetUser() user: UserEntity): Promise<object[]> {
    return this.courseService.getAllCourses(user);
  }

  // Get all sections of the given course
  @Get('/:course_id/allsections')
  getAllSections(
    @GetUser() user: UserEntity,
    @Param('course_id') course_id: string,
  ): Promise<object> {
    return this.courseService.getAllSections(user, course_id);
  }

  // Create new course
  @Post()
  @UsePipes(ValidationPipe)
  createNewCourse(
    @GetUser() user: UserEntity,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<string> {
    return this.courseService.createNewCourse(user, createCourseDto);
  }

  // Update new course
  @Patch('/:course_id/update')
  @UsePipes(ValidationPipe)
  updateCourse(
    @GetUser() user: UserEntity,
    @Param('course_id') course_id: string,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<object> {
    return this.courseService.updateCourse(user, course_id, createCourseDto);
  }

  // only to be used while adding new target audience or subject
  @Post('/targetaudience')
  createNewTargetaudience(
    @Body('targetAudience') targetAudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courseService.createNewTargetaudience(targetAudience);
  }

  @Post('/subject')
  createNewSubject(@Body('subject') subject: string): Promise<SubjectEntity> {
    return this.courseService.createNewSubject(subject);
  }
}
