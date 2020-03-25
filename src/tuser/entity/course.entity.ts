import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TuserEntity } from './tuser.entity';

@Entity()
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  course_id: string;

  @Column({ type: 'varchar', length: 50 })
  coursetitle: string;

  @Column({ type: 'text' })
  courseintro: string;

  @Column({ type: 'smallint' })
  targetaudience_id: number;

  @Column({ type: 'smallint' })
  subject_id: number;

  @Column({ type: 'integer' })
  fee: number;

  @Column({ type: 'integer' })
  studentsenrolled: number;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ type: 'integer' })
  noofrating: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(
    type => TuserEntity,
    tuserentity => tuserentity.courseentitys,
  )
  tuserentity: TuserEntity;
}
