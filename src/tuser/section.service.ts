import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionRepository } from './repository/section.repository';
import { SectionEntity } from './entity/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private sectionrepository: SectionRepository,
  ) {}

  async getAllSections(): Promise<SectionEntity[]> {
    return this.sectionrepository.getallsections();
  }

  async getSectionById(id: string): Promise<SectionEntity> {
    const found = await this.sectionrepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        'The Section you are searching is not Present',
      );
    }
    return found;
  }

  async createNewSection(
    id,
    createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return this.sectionrepository.createnewsection(id, createsectiondto);
  }

  async deleteSection(id: string): Promise<void> {
    const result = await this.sectionrepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }

  async updateSection(
    id: string,
    createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const ToBeUpdated = await this.getSectionById(id);
    return this.sectionrepository.updatesection(createsectiondto, ToBeUpdated);
  }
}
