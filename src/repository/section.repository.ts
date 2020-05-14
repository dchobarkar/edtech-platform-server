import {
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateSectionDto } from '../tuser/dto/create-section.dto';
import { SectionEntity } from '../entity/section.entity';

@EntityRepository(SectionEntity)
export class SectionRepository extends Repository<SectionEntity> {
  async createnewsection(
    id: string,
    createsectiondto: CreateSectionDto,
  ): Promise<Object> {
    const { sectiontitle, sectionintro } = createsectiondto;
    const NewSection = new SectionEntity();
    NewSection.sectiontitle = sectiontitle;
    NewSection.sectionintro = sectionintro;
    NewSection.courseentityCourseId = id;
    try {
      await NewSection.save();
    } catch (error) {
      if (error.code === '22P02') {
        throw new NotAcceptableException();
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    const newSection = {
      section_id: NewSection.section_id,
      sectiontitle: NewSection.sectiontitle,
      sectionintro: NewSection.sectionintro,
    };
    return newSection;
  }

  async updatesection(
    createsectiondto: CreateSectionDto,
    ToBeUpdated: SectionEntity,
  ): Promise<Object> {
    const { sectiontitle, sectionintro } = createsectiondto;
    ToBeUpdated.sectiontitle = sectiontitle;
    ToBeUpdated.sectionintro = sectionintro;
    await ToBeUpdated.save();
    const updatedSection = {
      section_id: ToBeUpdated.section_id,
      sectiontitle: ToBeUpdated.sectiontitle,
      sectionintro: ToBeUpdated.sectionintro,
    };
    return updatedSection;
  }
}
