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
@Unique(['targetAudience'])
export class TargetAudienceEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  targetAudience_id: number;

  @Column({ type: 'varchar', length: 50 })
  targetAudience: string;

  @OneToMany(
    type => CourseEntity,
    courseEntity => courseEntity.targetAudienceEntity,
  )
  courseEntitys: CourseEntity[];
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
    courseEntity => courseEntity.subjectEntity,
  )
  courseEntitys: CourseEntity[];
}

@Entity()
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  course_id: string;

  @Column({ type: 'varchar', length: 100 })
  courseTitle: string;

  @Column({ type: 'text' })
  courseIntro: string;

  @Column({ type: 'integer' })
  fee: number;

  @Column({ type: 'integer' })
  studentsEnrolled: number;

  @Column({ type: 'integer' })
  ratingPoint: number;

  @Column({ type: 'integer' })
  noOfRating: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @ManyToOne(
    type => UserEntity,
    userEntity => userEntity.courseEntitys,
  )
  userEntity: UserEntity;
  @Column()
  userEntityId: string;

  @OneToMany(
    type => SectionEntity,
    sectionEntity => sectionEntity.courseEntity,
  )
  sectionEntitys: SectionEntity[];

  @ManyToOne(
    type => TargetAudienceEntity,
    targetAudienceEntity => targetAudienceEntity.courseEntitys,
  )
  targetAudienceEntity: TargetAudienceEntity;
  @Column()
  targetAudienceEntityTargetAudienceId: number;

  @ManyToOne(
    type => SubjectEntity,
    subjectEntity => subjectEntity.courseEntitys,
  )
  subjectEntity: SubjectEntity;
  @Column()
  subjectEntitySubjectId: number;
}
