import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/user.entity';

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

  @Column()
  classintro: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  pincode: number;

  @Column()
  bannerimgurl: string;

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

  @OneToOne(
    type => UserEntity,
    userentity => userentity.tuserentity,
  )
  @JoinColumn()
  userentity: UserEntity;
  @Column()
  userentityId: string;
}
