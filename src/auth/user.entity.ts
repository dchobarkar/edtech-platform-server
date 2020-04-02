import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { TuserEntity } from '../tuser/entity/tuser.entity';
import { CourseEntity } from '../tuser/entity/course.entity';

@Entity()
@Unique(['mobile'])
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 100 })
  classname: string;

  @Column({ type: 'varchar', length: 10 })
  mobile: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;

  @OneToOne(
    type => TuserEntity,
    tuserentity => tuserentity.userentity,
  )
  tuserentity: TuserEntity;

  @OneToMany(
    type => CourseEntity,
    courseentity => courseentity.userentity,
  )
  courseentitys: CourseEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
