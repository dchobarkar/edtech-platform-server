import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { SectionRepository } from './repository/section.repository';
import { SectionEntity } from './entity/section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private sectionrepository: SectionRepository,
  ) {}

  async createNewSection(
    id: string,
    createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return this.sectionrepository.createnewsection(id, createsectiondto);
  }

  async updateSection(
    id: string,
    createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const ToBeUpdated = await this.getSectionById(id);
    return this.sectionrepository.updatesection(createsectiondto, ToBeUpdated);
  }

  async getSectionById(id: string): Promise<SectionEntity> {
    const section = await this.sectionrepository.findOne(id);
    if (!section) {
      throw new NotFoundException(
        'The Section you are searching is not Present',
      );
    }
    return section;
  }

  async deleteSection(id: string): Promise<void> {
    const deleted = await this.sectionrepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Section to be deleted is not present');
    }
  }
}
