import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionEntity } from '../../entity/question.entity';
import { UserRepository } from 'src/auth/user.repository';
import { CourseRepository } from 'src/repository/course.repository';
import { SectionRepository } from 'src/repository/section.repository';
import { ExamRepository } from 'src/repository/exam.repository';
import { QuestionRepository } from '../../repository/question.repository';

import { AwsHelper } from '../../utils/AwsHelper';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    @InjectRepository(ExamRepository)
    @InjectRepository(SectionRepository)
    @InjectRepository(CourseRepository)
    @InjectRepository(UserRepository)
    private questionrepository: QuestionRepository,
    private examrepository: ExamRepository,
    private sectionrepository: SectionRepository,
    private courserepository: CourseRepository,
    private userrepository: UserRepository,
    private awshelper: AwsHelper,
  ) {}

  async createNewQuestion(
    id: string,
    createquestiondto: CreateQuestionDto,
    image: any,
  ): Promise<Object> {
    let imgurl = 'none';
    if (image) {
      const examData = await this.examrepository.findOne(id);
      const sectionData = await this.sectionrepository.findOne(
        examData.sectionentitySectionId,
      );
      const courseData = await this.courserepository.findOne(
        sectionData.courseentityCourseId,
      );
      const userData = await this.userrepository.findOne(
        courseData.userentityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${examData.exam_id}/${createquestiondto.que}`;
      const imageData = await this.awshelper.UPLOAD_IMAGE(image, folderPath);
      imgurl = imageData.Location;
    }
    return this.questionrepository.createnewquestion(
      id,
      createquestiondto,
      imgurl,
    );
  }

  async updateQuestion(
    id: string,
    createquestiondto: CreateQuestionDto,
    image: any,
  ): Promise<Object> {
    const ToBeUpdated = await this.getQuestionById(id);
    let imgurl = ToBeUpdated.queimage;
    if (image) {
      const examData = await this.examrepository.findOne(
        ToBeUpdated.examentityExamId,
      );
      const sectionData = await this.sectionrepository.findOne(
        examData.sectionentitySectionId,
      );
      const courseData = await this.courserepository.findOne(
        sectionData.courseentityCourseId,
      );
      const userData = await this.userrepository.findOne(
        courseData.userentityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${examData.exam_id}/${createquestiondto.que}`;
      const imageData = await this.awshelper.UPLOAD_IMAGE(image, folderPath);
      imgurl = imageData.Location;
    }
    return this.questionrepository.updatequestion(
      createquestiondto,
      ToBeUpdated,
      imgurl,
    );
  }

  async getQuestionById(id: string): Promise<QuestionEntity> {
    const question = await this.questionrepository.findOne(id);
    if (!question) {
      throw new NotFoundException('Unknown Question');
    }
    return question;
  }

  async deleteQuestion(id: string): Promise<void> {
    const deleted = await this.questionrepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
