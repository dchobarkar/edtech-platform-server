import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SectionEntity } from './section.entity';
import { UserEntity } from '../../auth/user.entity';

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

  @CreateDateColumn({ type: 'date' })
  date: Date;

  @ManyToOne(
    type => UserEntity,
    userentity => userentity.courseentitys,
  )
  userentity: UserEntity;

  @Column()
  userentityId: string;

  @OneToMany(
    type => SectionEntity,
    sectionentity => sectionentity.courseentity,
  )
  sectionentitys: SectionEntity[];
}
