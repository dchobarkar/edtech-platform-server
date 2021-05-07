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

// Target Audience Table
@Entity()
@Unique(['targetAudience'])
export class TargetAudienceEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  targetAudience_id: number;

  @Column({ type: 'varchar', length: 50 })
  targetAudience: string;

  // CourseEntity Relation
  @OneToMany(
    type => CourseEntity,
    courseEntity => courseEntity.targetAudienceEntity,
  )
  courseEntitys: CourseEntity[];
}

// Subject Table
@Entity()
@Unique(['subject'])
export class SubjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  subject_id: number;

  @Column({ type: 'varchar', length: 50 })
  subject: string;

  // CourseEntity Relation
  @OneToMany(
    type => CourseEntity,
    courseEntity => courseEntity.subjectEntity,
  )
  courseEntitys: CourseEntity[];
}

// CourseEntity Table
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

  // UserEntity Relation
  @ManyToOne(
    type => UserEntity,
    userEntity => userEntity.courseEntitys,
  )
  userEntity: UserEntity;
  @Column()
  userEntityId: string;

  // SectionEntity Relation
  @OneToMany(
    type => SectionEntity,
    sectionEntity => sectionEntity.courseEntity,
  )
  sectionEntitys: SectionEntity[];

  // TargetAudience Relation
  @ManyToOne(
    type => TargetAudienceEntity,
    targetAudienceEntity => targetAudienceEntity.courseEntitys,
  )
  targetAudienceEntity: TargetAudienceEntity;
  @Column()
  targetAudienceEntityTargetAudienceId: number;

  // SubjectEntity Relation
  @ManyToOne(
    type => SubjectEntity,
    subjectEntity => subjectEntity.courseEntitys,
  )
  subjectEntity: SubjectEntity;
  @Column()
  subjectEntitySubjectId: number;
}
