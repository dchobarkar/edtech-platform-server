import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrowseCoursesController } from './browsecourses.controller';
import { BrowseCoursesService } from './browsecourses.service';
import { CourseRepository } from '../../course/course.repository';

import { CustomFunctions } from 'src/utils/customFunctions';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository])],
  controllers: [BrowseCoursesController],
  providers: [BrowseCoursesService, CustomFunctions],
})
export class BrowseCoursesModule {}
