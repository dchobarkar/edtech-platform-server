import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { SectionEntity } from './section.entity';

@EntityRepository(SectionEntity)
export class SectionRepository extends Repository<SectionEntity> {
  async createnewsection(
    course_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const { sectionTitle, sectionIntro } = createSectionDto;
    const newSection = new SectionEntity();
    newSection.sectionTitle = sectionTitle;
    newSection.sectionIntro = sectionIntro;
    newSection.courseEntityCourseId = course_id;
    try {
      await newSection.save();
    } catch (error) {
      if (error.code === '22P02') {
        throw new NotAcceptableException();
      } else {
        console.log(`Error in createnewsection\n${createSectionDto}\n${error}`);
        throw new InternalServerErrorException();
      }
    }
    return newSection;
  }

  async updatesection(
    section_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const { sectionTitle, sectionIntro } = createSectionDto;

    // search for tobeupdated section
    let toBeUpdatedSection = await this.findOne({
      where: { section_id: section_id },
    });

    toBeUpdatedSection.sectionTitle = sectionTitle;
    toBeUpdatedSection.sectionIntro = sectionIntro;
    await toBeUpdatedSection.save();
    return toBeUpdatedSection;
  }

  async deletesection(section_id: string): Promise<void> {
    const deletedSection = await this.delete(section_id);
    if (deletedSection.affected === 0) {
      throw new NotFoundException();
    }
  }
}
