import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { CourseEntity } from '../course/course.entity';

import { LectureEntity } from '../lecture/lecture.entity';

import { ExamEntity } from '../exam/exam.entity';

@Entity()
export class SectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  section_id: string;

  @Column({ type: 'varchar', length: 100 })
  sectionTitle: string;

  @Column({ type: 'text' })
  sectionIntro: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  // CourseEntity Relation
  @ManyToOne(
    type => CourseEntity,
    courseEntity => courseEntity.sectionEntitys,
    { onDelete: 'CASCADE' },
  )
  courseEntity: CourseEntity;
  @Column()
  courseEntityCourseId: string;

  // LectureEntity Relation
  @OneToMany(
    type => LectureEntity,
    lectureEntity => lectureEntity.sectionEntity,
  )
  lectureEntitys: LectureEntity[];

  // ExamEntity Relation
  @OneToMany(
    type => ExamEntity,
    examEntity => examEntity.sectionEntity,
  )
  examEntitys: ExamEntity[];
}
