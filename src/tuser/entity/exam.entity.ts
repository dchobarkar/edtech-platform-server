import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SectionEntity } from './section.entity';
import { QuestionEntity } from './question.entity';

@Entity()
export class ExamEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  exam_id: string;

  @Column({ type: 'varchar', length: 50 })
  examtitle: string;

  @Column({ type: 'text' })
  examinstruction: string;

  @Column({ type: 'smallint' })
  duration: number;

  @ManyToOne(
    type => SectionEntity,
    sectionentity => sectionentity.examentitys,
    { onDelete: 'CASCADE' },
  )
  sectionentity: SectionEntity;

  @OneToMany(
    type => QuestionEntity,
    questionentity => questionentity.examentity,
  )
  questionentitys: QuestionEntity[];
}
