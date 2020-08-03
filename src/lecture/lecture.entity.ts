import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { SectionEntity } from '../section/section.entity';

@Entity()
export class LectureEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  lecture_id: string;

  @Column({ type: 'varchar', length: 100 })
  lectureTitle: string;

  @Column({ type: 'text' })
  lectureIntro: string;

  @Column({ type: 'varchar' })
  lectureVideo: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @ManyToOne(
    type => SectionEntity,
    sectionEntity => sectionEntity.lectureEntitys,
    { onDelete: 'CASCADE' },
  )
  sectionEntity: SectionEntity;
  @Column()
  sectionEntitySectionId: string;
}
