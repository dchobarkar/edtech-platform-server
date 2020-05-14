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

import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseService } from './course.service';
import { UserEntity } from '../../auth/user.entity';
import {
  TargetAudienceEntity,
  SubjectEntity,
} from '../../entity/course.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('course')
@UseGuards(AuthGuard())
export class CourseController {
  constructor(private courseservice: CourseService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createNewCourse(
    @GetUser() user: UserEntity,
    @Body() createcoursedto: CreateCourseDto,
  ): Promise<Object> {
    return this.courseservice.createNewCourse(user, createcoursedto);
  }

  @Get()
  getAllCourses(@GetUser() user: UserEntity): Promise<Object[]> {
    return this.courseservice.getAllCourses(user);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateCourse(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() createcoursedto: CreateCourseDto,
  ): Promise<Object> {
    return this.courseservice.updateCourse(user, id, createcoursedto);
  }

  @Get('/:id/allsections')
  getAllSections(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<Object> {
    return this.courseservice.getAllSections(user, id);
  }

  @Post('/targetaudience')
  createNewTargetaudience(
    @Body('targetaudience') targetaudience: string,
  ): Promise<TargetAudienceEntity> {
    return this.courseservice.createNewTargetaudience(targetaudience);
  }

  @Post('/subject')
  createNewSubject(@Body('subject') subject: string): Promise<SubjectEntity> {
    return this.courseservice.createNewSubject(subject);
  }
}
