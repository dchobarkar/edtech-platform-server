import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { SectionRepository } from './section.repository';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private sectionRepository: SectionRepository,
  ) {}

  async createNewSection(
    course_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<object> {
    // save newsection
    const tempnewsection = await this.sectionRepository.createnewsection(
      course_id,
      createSectionDto,
    );

    // return needed data
    const newsection = {
      section_id: tempnewsection.section_id,
      sectiontitle: tempnewsection.sectiontitle,
      sectionintro: tempnewsection.sectionintro,
    };
    return newsection;
  }

  async updateSection(
    section_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<Object> {
    // updated section
    const tempupdatedsection = await this.sectionRepository.updatesection(
      section_id,
      createSectionDto,
    );

    // return needed data
    const updatedsection = {
      sectiontitle: tempupdatedsection.sectiontitle,
      sectionintro: tempupdatedsection.sectionintro,
    };
    return updatedsection;
  }

  async deleteSection(section_id: string): Promise<void> {
    return this.sectionRepository.deletesection(section_id);
  }
}
