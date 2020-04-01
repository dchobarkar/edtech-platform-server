import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { SectionEntity } from './section.entity';

@Entity()
export class LectureEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  lecture_id: string;

  @Column({ type: 'varchar', length: 50 })
  lecturetitle: string;

  @Column({ type: 'text' })
  lectureintro: string;

  @Column()
  lecturevideo: string;

  @ManyToOne(
    type => SectionEntity,
    sectionentity => sectionentity.lectureentitys,
    { onDelete: 'CASCADE' },
  )
  sectionentity: SectionEntity;
}
