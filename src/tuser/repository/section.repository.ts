import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateSectionDto } from '../dto/create-section.dto';
import { SectionEntity } from '../entity/section.entity';

@EntityRepository(SectionEntity)
export class SectionRepository extends Repository<SectionEntity> {
  async createnewsection(
    id: string,
    createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const { sectiontitle, sectionintro } = createsectiondto;

    const NewSection = new SectionEntity();

    NewSection.sectiontitle = sectiontitle;
    NewSection.sectionintro = sectionintro;

    NewSection.courseentityCourseId = id;

    try {
      await NewSection.save();
    } catch (error) {
      if (error.code === '23502') {
        throw new InternalServerErrorException(
          'Please provide all information',
        );
      } else if (error.code === '22001') {
        throw new InternalServerErrorException('Value too long for given type');
      } else {
        throw new InternalServerErrorException('Unknown');
      }
    }

    return NewSection;
  }

  async updatesection(
    createsectiondto: CreateSectionDto,
    ToBeUpdated: SectionEntity,
  ): Promise<SectionEntity> {
    const { sectiontitle, sectionintro } = createsectiondto;

    ToBeUpdated.sectiontitle = sectiontitle;
    ToBeUpdated.sectionintro = sectionintro;

    await ToBeUpdated.save();
    return ToBeUpdated;
  }
}
