import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './repository/course.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository]), AuthModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
