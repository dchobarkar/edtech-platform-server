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
  examTitle: string;

  @Column({ type: 'text' })
  examInstruction: string;

  @Column({ type: 'smallint' })
  duration: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  // SectionEntity Relation
  @ManyToOne(
    type => SectionEntity,
    sectionEntity => sectionEntity.examEntitys,
    { onDelete: 'CASCADE' },
  )
  sectionEntity: SectionEntity;
  @Column()
  sectionEntitySectionId: string;

  // QuestionEntity Relation
  @OneToMany(
    type => QuestionEntity,
    questionEntity => questionEntity.examEntity,
  )
  questionEntitys: QuestionEntity[];
}
