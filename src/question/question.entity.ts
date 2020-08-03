import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { ExamEntity } from '../exam/exam.entity';

@Entity()
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  que_id: string;

  @Column({ type: 'text' })
  que: string;

  @Column({ type: 'varchar' })
  opt1: string;

  @Column({ type: 'varchar' })
  opt2: string;

  @Column({ type: 'varchar' })
  opt3: string;

  @Column({ type: 'varchar' })
  opt4: string;

  @Column({ type: 'varchar', length: 1 })
  answer: string;

  @Column({ type: 'varchar' })
  queImage: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @ManyToOne(
    type => ExamEntity,
    examEntity => examEntity.questionEntitys,
    { onDelete: 'CASCADE' },
  )
  examEntity: ExamEntity;
  @Column()
  examEntityExamId: string;
}
