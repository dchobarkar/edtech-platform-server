import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { ExamEntity } from './exam.entity';

@Entity()
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  que_id: string;

  @Column({ type: 'varchar' })
  que: string;

  @Column({ type: 'varchar' })
  opt1: string;

  @Column({ type: 'varchar' })
  opt2: string;

  @Column({ type: 'varchar' })
  opt3: string;

  @Column({ type: 'varchar' })
  opt4: string;

  @Column()
  queimage: string;

  @Column({ type: 'smallint' })
  answer: number;

  @ManyToOne(
    type => ExamEntity,
    examentity => examentity.questionentitys,
    { onDelete: 'CASCADE' },
  )
  examentity: ExamEntity;
}
