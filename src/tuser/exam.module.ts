import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamRepository } from './repository/exam.repository';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamRepository])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
