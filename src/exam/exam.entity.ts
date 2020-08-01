import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { SectionEntity } from '../section/section.entity';

import { QuestionEntity } from '../question/question.entity';

@Entity()
export class ExamEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  exam_id: string;

  @Column({ type: 'varchar', length: 100 })
  examtitle: string;

  @Column({ type: 'text' })
  examinstruction: string;

  @Column({ type: 'smallint' })
  duration: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @ManyToOne(
    type => SectionEntity,
    sectionentity => sectionentity.examentitys,
    { onDelete: 'CASCADE' },
  )
  sectionentity: SectionEntity;
  @Column()
  sectionentitySectionId: string;

  @OneToMany(
    type => QuestionEntity,
    questionentity => questionentity.examentity,
  )
  questionentitys: QuestionEntity[];
}
