import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../auth/user.repository';

import { CourseRepository } from '../course/course.repository';

import { SectionRepository } from '../section/section.repository';

import { ExamRepository } from '../exam/exam.repository';

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './question.repository';

import { AwsHelper } from '../utils/AwsHelper';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    @InjectRepository(ExamRepository)
    @InjectRepository(SectionRepository)
    @InjectRepository(CourseRepository)
    @InjectRepository(UserRepository)
    private questionRepository: QuestionRepository,
    private examRepository: ExamRepository,
    private sectionRepository: SectionRepository,
    private courseRepository: CourseRepository,
    private userRepository: UserRepository,
    private awsHelper: AwsHelper,
  ) {}

  async createNewQuestion(
    exam_id: string,
    createQuestionDto: CreateQuestionDto,
    image: any,
  ): Promise<Object> {
    // upload img to aws
    let imgurl = 'none';
    if (image) {
      const examData = await this.examRepository.findOne(exam_id);
      const sectionData = await this.sectionRepository.findOne(
        examData.sectionentitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseentityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userentityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${examData.exam_id}/${createQuestionDto.que}`;
      const imageData = await this.awsHelper.UPLOAD_IMAGE(image, folderPath);
      imgurl = imageData.Location;
    }

    // create new question
    const tempnewquestion = await this.questionRepository.createnewquestion(
      exam_id,
      createQuestionDto,
      imgurl,
    );

    // return needed data
    const newquestion = {
      que_id: tempnewquestion.que_id,
      que: tempnewquestion.que,
      opt1: tempnewquestion.opt1,
      opt2: tempnewquestion.opt2,
      opt3: tempnewquestion.opt3,
      opt4: tempnewquestion.opt4,
      answer: tempnewquestion.answer,
      queimage: tempnewquestion.queimage,
    };
    return newquestion;
  }

  async updateQuestion(
    question_id: string,
    createQuestionDto: CreateQuestionDto,
    image: any,
  ): Promise<Object> {
    // search tobeupdated question
    const tobeupdatedquestion = await this.questionRepository.getquestionbyid(
      question_id,
    );

    // upload img to the aws
    let imgurl = tobeupdatedquestion.queimage;
    if (image) {
      const examData = await this.examRepository.findOne(
        tobeupdatedquestion.examentityExamId,
      );
      const sectionData = await this.sectionRepository.findOne(
        examData.sectionentitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseentityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userentityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${examData.exam_id}/${createQuestionDto.que}`;
      const imageData = await this.awsHelper.UPLOAD_IMAGE(image, folderPath);
      imgurl = imageData.Location;
    }

    // update question
    const tempupdatedquestion = await this.questionRepository.updatequestion(
      createQuestionDto,
      tobeupdatedquestion,
      imgurl,
    );

    // return needed data
    const updatedquestion = {
      que: tempupdatedquestion.que,
      opt1: tempupdatedquestion.opt1,
      opt2: tempupdatedquestion.opt2,
      opt3: tempupdatedquestion.opt3,
      opt4: tempupdatedquestion.opt4,
      answer: tempupdatedquestion.answer,
      queimage: tempupdatedquestion.queimage,
    };
    return updatedquestion;
  }

  async deleteQuestion(question_id: string): Promise<void> {
    return this.questionRepository.deletequestion(question_id);
  }
}
