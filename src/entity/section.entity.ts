import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';
import { ExamEntity } from './exam.entity';

@Entity()
export class SectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  section_id: string;

  @Column({ type: 'varchar', length: 100 })
  sectiontitle: string;

  @Column({ type: 'text' })
  sectionintro: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: Date;

  @ManyToOne(
    type => CourseEntity,
    courseentity => courseentity.sectionentitys,
    { onDelete: 'CASCADE' },
  )
  courseentity: CourseEntity;
  @Column()
  courseentityCourseId: string;

  @OneToMany(
    type => LectureEntity,
    lectureentity => lectureentity.sectionentity,
  )
  lectureentitys: LectureEntity[];

  @OneToMany(
    type => ExamEntity,
    examentity => examentity.sectionentity,
  )
  examentitys: ExamEntity[];
}
