import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  course_id: string;

  @Column()
  tuser_id: string;

  @Column()
  coursetitle: string;

  @Column()
  courseintro: string;

  @Column()
  targetaudience_id: number;

  @Column()
  subject_id: number;

  @Column()
  studentsenrolled: number;

  @Column()
  fee: number;

  @Column()
  rating: number;

  @Column()
  noofrating: number;
}
