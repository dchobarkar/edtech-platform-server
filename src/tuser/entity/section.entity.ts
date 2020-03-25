import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';
import { ExamEntity } from './exam.entity';

@Entity()
export class SectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  section_id: string;

  @Column({ type: 'varchar', length: 50 })
  sectiontitle: string;

  @Column({ type: 'text' })
  sectionintro: string;

  @ManyToOne(
    type => CourseEntity,
    courseentity => courseentity.sectionentitys,
  )
  courseentity: CourseEntity;

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
