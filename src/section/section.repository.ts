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
    const { sectiontitle, sectionintro } = createSectionDto;
    const newsection = new SectionEntity();
    newsection.sectiontitle = sectiontitle;
    newsection.sectionintro = sectionintro;
    newsection.courseentityCourseId = course_id;
    try {
      await newsection.save();
    } catch (error) {
      if (error.code === '22P02') {
        throw new NotAcceptableException();
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    return newsection;
  }

  async updatesection(
    section_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const { sectiontitle, sectionintro } = createSectionDto;

    // search for tobeupdated section
    let tobeupdatedsection = await this.findOne({
      where: { section_id: section_id },
    });

    tobeupdatedsection.sectiontitle = sectiontitle;
    tobeupdatedsection.sectionintro = sectionintro;
    await tobeupdatedsection.save();
    return tobeupdatedsection;
  }

  async deletesection(section_id: string): Promise<void> {
    const deleted = await this.delete(section_id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
