import { EntityRepository, Repository } from 'typeorm';
import { SectionEntity } from '../entity/section.entity';
import { CreateSectionDto } from '../dto/create-section.dto';

@EntityRepository(SectionEntity)
export class SectionRepository extends Repository<SectionEntity> {
  async getallsections(): Promise<SectionEntity[]> {
    const query = this.createQueryBuilder('section');
    const getallsections = await query.getMany();
    return getallsections;
  }

  async createnewsection(
    id,
    createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    const { sectiontitle, sectionintro } = createsectiondto;
    const NewSection = new SectionEntity();
    NewSection.sectiontitle = sectiontitle;
    NewSection.sectionintro = sectionintro;

    NewSection.courseentityCourseId = id;

    await NewSection.save();
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
