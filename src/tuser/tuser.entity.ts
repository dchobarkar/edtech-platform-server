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
    tUserEntity => tUserEntity.countryEntity,
  )
  tUserEntitys: TuserEntity[];

  @OneToMany(
    type => StateEntity,
    stateEntity => stateEntity.countryEntity,
  )
  stateEntitys: StateEntity[];
}

@Entity()
export class StateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  state_id: number;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @OneToMany(
    type => TuserEntity,
    tUserEntity => tUserEntity.stateEntity,
  )
  tUserEntitys: TuserEntity[];

  @ManyToOne(
    type => CountryEntity,
    countryEntity => countryEntity.stateEntitys,
  )
  countryEntity: CountryEntity;
  @Column()
  countryEntityCountryId: number;
}

@Entity()
export class TuserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  tuser_id: string;

  @Column({ type: 'text' })
  classIntro: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 6 })
  pincode: string;

  @Column({ type: 'varchar' })
  bannerImgUrl: string;

  @ManyToOne(
    type => CountryEntity,
    countryEntity => countryEntity.tUserEntitys,
  )
  countryEntity: CountryEntity;
  @Column()
  countryEntityCountryId: number;

  @ManyToOne(
    type => StateEntity,
    stateEntity => stateEntity.tUserEntitys,
  )
  stateEntity: StateEntity;
  @Column()
  stateEntityStateId: number;

  @OneToOne(
    type => UserEntity,
    userEntity => userEntity.tUserEntity,
  )
  @JoinColumn()
  userEntity: UserEntity;
  @Column()
  userEntityId: string;
}
