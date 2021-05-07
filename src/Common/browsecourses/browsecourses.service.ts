import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseRepository } from '../../course/course.repository';

import { CustomFunctions } from 'src/utils/customFunctions';

@Injectable()
export class BrowseCoursesService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    private customFunctions: CustomFunctions,
  ) {}

  //   Get all courses to browse for any user service
  async getBrowseCourses(): Promise<object[]> {
    //   Get row data
    const tempBrowseCourses = await this.courseRepository.getbrowsecourses();
    // Return needed data
    let browseCourses = [];
    tempBrowseCourses.map((tempBrowseCourse, Index) => {
      const browseCourse = {
        course_id: tempBrowseCourse.course_id,
        courseTitle: tempBrowseCourse.courseTitle,
        courseIntro: tempBrowseCourse.courseIntro,
        studentsEnrolled: tempBrowseCourse.studentsEnrolled,
        ratingPoint: tempBrowseCourse.ratingPoint,
        noOfRating: tempBrowseCourse.noOfRating,
        fee: tempBrowseCourse.fee,
        created_at: tempBrowseCourse.created_at,
        className: tempBrowseCourse.userEntity.className,
        targetAudience: tempBrowseCourse.targetAudienceEntity.targetAudience,
        subject: tempBrowseCourse.subjectEntity.subject,
      };
      browseCourses.push(browseCourse);
    });
    return browseCourses;
  }

  // Get coursedetails to browse for any user service
  async getBrowseCourseDetails(course_id: string): Promise<object> {
    // Get row data (everything related to the course)
    const tempBrowseCourseDetails = await this.courseRepository.getbrowsecoursedetails(
      course_id,
    );

    // return only needed data
    this.customFunctions.sortFunction(
      tempBrowseCourseDetails.sectionEntitys,
      'created_at',
    );
    let sections = [];
    tempBrowseCourseDetails.sectionEntitys.map((section, Index) => {
      this.customFunctions.sortFunction(section.lectureEntitys, 'created_at');
      this.customFunctions.sortFunction(section.examEntitys, 'created_at');
      let lectures = [];
      let exams = [];
      section.lectureEntitys.map((lecture, Index) => {
        let tempLecture = {
          lectureTitle: lecture.lectureTitle,
        };
        lectures.push(tempLecture);
      });
      section.examEntitys.map((exam, Index) => {
        let tempExam = {
          examTitle: exam.examTitle,
          duration: exam.duration,
          questionNo: exam.questionEntitys.length,
        };
        exams.push(tempExam);
      });
      let tempSection = {
        sectionTitle: section.sectionTitle,
        lectureEntitys: lectures,
        examEntitys: exams,
      };
      sections.push(tempSection);
    });
    let browseCourseDetails = {
      course_id: tempBrowseCourseDetails.course_id,
      courseTitle: tempBrowseCourseDetails.courseTitle,
      courseIntro: tempBrowseCourseDetails.courseIntro,
      studentsEnrolled: tempBrowseCourseDetails.studentsEnrolled,
      ratingPoint: tempBrowseCourseDetails.ratingPoint,
      noOfRating: tempBrowseCourseDetails.noOfRating,
      fee: tempBrowseCourseDetails.fee,
      created_at: tempBrowseCourseDetails.created_at,

      targetAudience:
        tempBrowseCourseDetails.targetAudienceEntity.targetAudience,
      subject: tempBrowseCourseDetails.subjectEntity.subject,

      className: tempBrowseCourseDetails.userEntity.className,
      classIntro: tempBrowseCourseDetails.userEntity.tUserEntity.classIntro,
      classCity: tempBrowseCourseDetails.userEntity.tUserEntity.city,
      classBanner: tempBrowseCourseDetails.userEntity.tUserEntity.bannerImgUrl,

      sectionEntitys: sections,
    };
    return browseCourseDetails;
  }
}
