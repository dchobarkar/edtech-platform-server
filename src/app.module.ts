import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuserModule } from './tuser/tuser.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CourseModule } from './tuser/course.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TuserModule, CourseModule],
})
export class AppModule {}
