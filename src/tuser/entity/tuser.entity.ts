import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
} from 'typeorm';

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

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  mobile: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column()
  bannerimgurl: string;

  @Column({ type: 'varchar', length: 90 })
  address: string;

  @Column({ type: 'smallint' })
  country_id: number;

  @Column({ type: 'smallint' })
  state_id: number;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'integer' })
  pincode: number;

  @Column({ type: 'text' })
  intro: string;
}

// export class CountryEntity extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   country_id: number;

//   @Column()
//   country: string;
// }

// export class StateEntity extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   state_id: number;

//   @Column()
//   state: string;

//   @Column()
//   country_id: number;
// }
