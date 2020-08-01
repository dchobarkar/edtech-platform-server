import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../auth/user.entity';

@Entity()
@Unique(['country'])
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
  @Column()
  countryentityCountryId: number;
}

@Entity()
export class TuserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  tuser_id: string;

  @Column({ type: 'text' })
  classintro: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 6 })
  pincode: string;

  @Column({ type: 'varchar' })
  bannerimgurl: string;

  @ManyToOne(
    type => CountryEntity,
    countryentity => countryentity.tuserentitys,
  )
  countryentity: CountryEntity;
  @Column()
  countryentityCountryId: number;

  @ManyToOne(
    type => StateEntity,
    stateentity => stateentity.tuserentitys,
  )
  stateentity: StateEntity;
  @Column()
  stateentityStateId: number;

  @OneToOne(
    type => UserEntity,
    userentity => userentity.tuserentity,
  )
  @JoinColumn()
  userentity: UserEntity;
  @Column()
  userentityId: string;
}
