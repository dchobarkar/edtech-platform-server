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

  // Create new question service
  async createNewQuestion(
    exam_id: string,
    createQuestionDto: CreateQuestionDto,
    image: any,
  ): Promise<object> {
    // upload img to aws
    let imgUrl = 'none';
    if (image) {
      const examData = await this.examRepository.findOne(exam_id);
      const sectionData = await this.sectionRepository.findOne(
        examData.sectionEntitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseEntityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userEntityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${examData.exam_id}/${createQuestionDto.que}`;
      const imageData = await this.awsHelper.UPLOAD_IMAGE(image, folderPath);
      imgUrl = imageData.Location;
    }

    // create new question
    const tempNewQuestion = await this.questionRepository.createnewquestion(
      exam_id,
      createQuestionDto,
      imgUrl,
    );

    // return needed data
    const newQuestion = {
      que_id: tempNewQuestion.que_id,
      que: tempNewQuestion.que,
      opt1: tempNewQuestion.opt1,
      opt2: tempNewQuestion.opt2,
      opt3: tempNewQuestion.opt3,
      opt4: tempNewQuestion.opt4,
      answer: tempNewQuestion.answer,
      queimage: tempNewQuestion.queImage,
    };
    return newQuestion;
  }

  // Update given question service
  async updateQuestion(
    question_id: string,
    createQuestionDto: CreateQuestionDto,
    image: any,
  ): Promise<object> {
    // search tobeupdated question
    const toBeUpdatedQuestion = await this.questionRepository.getquestionbyid(
      question_id,
    );

    // upload img to the aws
    let imgUrl = toBeUpdatedQuestion.queImage;
    if (image) {
      const examData = await this.examRepository.findOne(
        toBeUpdatedQuestion.examEntityExamId,
      );
      const sectionData = await this.sectionRepository.findOne(
        examData.sectionEntitySectionId,
      );
      const courseData = await this.courseRepository.findOne(
        sectionData.courseEntityCourseId,
      );
      const userData = await this.userRepository.findOne(
        courseData.userEntityId,
      );
      const folderPath = `${userData.id}/${courseData.course_id}/${sectionData.section_id}/${examData.exam_id}/${createQuestionDto.que}`;
      const imageData = await this.awsHelper.UPLOAD_IMAGE(image, folderPath);
      imgUrl = imageData.Location;
    }

    // update question
    const tempUpdatedQuestion = await this.questionRepository.updatequestion(
      createQuestionDto,
      toBeUpdatedQuestion,
      imgUrl,
    );

    // return needed data
    const updatedQuestion = {
      que: tempUpdatedQuestion.que,
      opt1: tempUpdatedQuestion.opt1,
      opt2: tempUpdatedQuestion.opt2,
      opt3: tempUpdatedQuestion.opt3,
      opt4: tempUpdatedQuestion.opt4,
      answer: tempUpdatedQuestion.answer,
      queImage: tempUpdatedQuestion.queImage,
    };
    return updatedQuestion;
  }

  // Delete given question service
  async deleteQuestion(question_id: string): Promise<void> {
    return this.questionRepository.deletequestion(question_id);
  }
}
