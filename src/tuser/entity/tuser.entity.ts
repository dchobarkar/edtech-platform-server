import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
export class CountryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  country_id: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @OneToMany(
    type => TuserEntity,
    tuserentity => tuserentity.countryentity,
  )
  tuserentitys: TuserEntity[];

  @OneToMany(
    type => StateEntity,
    stateentity => stateentity.countryentity,
  )
  stateentitys: StateEntity[];
}

@Entity()
export class StateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  state_id: number;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @OneToMany(
    type => TuserEntity,
    tuserentity => tuserentity.stateentity,
  )
  tuserentitys: TuserEntity[];

  @ManyToOne(
    type => CountryEntity,
    countryentity => countryentity.stateentitys,
  )
  countryentity: CountryEntity;
}

@Entity()
export class TuserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 50 })
  classname: string;

  @Column({ type: 'text' })
  intro: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  mobile: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 90 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'integer' })
  pincode: number;

  @Column()
  bannerimgurl: string;

  @OneToMany(
    type => CourseEntity,
    courseentity => courseentity.tuserentity,
  )
  courseentitys: CourseEntity[];

  @ManyToOne(
    type => CountryEntity,
    countryentity => countryentity.tuserentitys,
  )
  countryentity: CountryEntity;

  @ManyToOne(
    type => StateEntity,
    stateentity => stateentity.tuserentitys,
  )
  stateentity: StateEntity;
}
