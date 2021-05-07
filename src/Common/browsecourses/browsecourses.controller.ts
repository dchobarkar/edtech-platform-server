import { Controller, Get, Param } from '@nestjs/common';

import { BrowseCoursesService } from './browsecourses.service';

@Controller('browsecourses')
export class BrowseCoursesController {
  constructor(private browseCoursesService: BrowseCoursesService) {}

  //   Get all courses to browse for any user
  @Get()
  getBrowseCourses(): Promise<object[]> {
    return this.browseCoursesService.getBrowseCourses();
  }

  // Get coursedetails to browse for any user
  @Get('/:course_id')
  getBrowseCourseDetails(
    @Param('course_id') course_id: string,
  ): Promise<object> {
    return this.browseCoursesService.getBrowseCourseDetails(course_id);
  }
}
