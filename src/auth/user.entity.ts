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

import { TuserEntity } from '../tuser/tuser.entity';
import { CourseEntity } from '../course/course.entity';

@Entity()
@Unique(['mobileNo'])
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  className: string;

  @Column({ type: 'varchar', length: 10 })
  mobileNo: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;

  // TUserEntity relation
  @OneToOne(
    type => TuserEntity,
    tUserEntity => tUserEntity.userEntity,
  )
  tUserEntity: TuserEntity;

  // CourseEntity Relation
  @OneToMany(
    type => CourseEntity,
    courseEntity => courseEntity.userEntity,
  )
  courseEntitys: CourseEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
