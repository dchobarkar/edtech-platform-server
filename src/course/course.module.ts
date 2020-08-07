import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';

import { CustomFunctions } from '../utils/customFunctions';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository]), AuthModule],
  controllers: [CourseController],
  providers: [CourseService, CustomFunctions],
})
export class CourseModule {}
