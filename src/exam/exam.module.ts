import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { ExamRepository } from './exam.repository';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamRepository]), AuthModule],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
