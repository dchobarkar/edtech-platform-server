import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  CreateDateColumn,
} from 'typeorm';

import { UserEntity } from '../auth/user.entity';

import { SectionEntity } from '../section/section.entity';

@Entity()
@Unique(['targetaudience'])
export class TargetAudienceEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  targetaudience_id: number;

  @Column({ type: 'varchar', length: 50 })
  targetaudience: string;

  @OneToMany(
    type => CourseEntity,
    courseentity => courseentity.targetaudienceentity,
  )
  courseentitys: CourseEntity[];
}

@Entity()
@Unique(['subject'])
export class SubjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  subject_id: number;

  @Column({ type: 'varchar', length: 50 })
  subject: string;

  @OneToMany(
    type => CourseEntity,
    courseentity => courseentity.subjectentity,
  )
  courseentitys: CourseEntity[];
}

@Entity()
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  course_id: string;

  @Column({ type: 'varchar', length: 100 })
  coursetitle: string;

  @Column({ type: 'text' })
  courseintro: string;

  @Column({ type: 'integer' })
  fee: number;

  @Column({ type: 'integer' })
  studentsenrolled: number;

  @Column({ type: 'integer' })
  ratingpoint: number;

  @Column({ type: 'integer' })
  noofrating: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

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

  @ManyToOne(
    type => TargetAudienceEntity,
    targetaudienceentity => targetaudienceentity.courseentitys,
  )
  targetaudienceentity: TargetAudienceEntity;
  @Column()
  targetaudienceentityTargetaudienceId: number;

  @ManyToOne(
    type => SubjectEntity,
    subjectentity => subjectentity.courseentitys,
  )
  subjectentity: SubjectEntity;
  @Column()
  subjectentitySubjectId: number;
}
