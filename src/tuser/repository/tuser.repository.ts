import { Repository, EntityRepository } from 'typeorm';

import {
  TuserEntity,
  CountryEntity,
  StateEntity,
} from '../entity/tuser.entity';
import { CreateTuserDto } from '../dto/create-tuser.dto';
import { UserEntity } from '../../auth/user.entity';

@EntityRepository(TuserEntity)
export class TuserRepository extends Repository<TuserEntity> {
  async getalltuser(): Promise<TuserEntity[]> {
    const query = this.createQueryBuilder('tuser');
    const getalltuser = await query.getMany();

    return getalltuser;
  }

  async createtuser(
    createtuserdto: CreateTuserDto,
    user: UserEntity,
  ): Promise<TuserEntity> {
    const {
      classintro,
      address,
      city,
      pincode,
      bannerimgurl,
      country_id,
      state_id,
    } = createtuserdto;

    const NewTuser = new TuserEntity();

    NewTuser.classintro = classintro;
    NewTuser.address = address;
    NewTuser.city = city;
    NewTuser.pincode = 431517;
    NewTuser.bannerimgurl = bannerimgurl;

    NewTuser.countryentity = country_id;
    NewTuser.stateentity = state_id;

    NewTuser.userentity = user;
    await NewTuser.save();

    delete NewTuser.userentity.password;
    delete NewTuser.userentity.salt;

    return NewTuser;
  }

  async updatetuser(
    createtuserdto: CreateTuserDto,
    ToBeUpdated: TuserEntity,
  ): Promise<TuserEntity> {
    const {
      classintro,
      address,
      city,
      pincode,
      bannerimgurl,
      country_id,
      state_id,
    } = createtuserdto;

    ToBeUpdated.classintro = classintro;
    ToBeUpdated.address = address;
    ToBeUpdated.city = city;
    ToBeUpdated.pincode = pincode;
    ToBeUpdated.bannerimgurl = bannerimgurl;
    // ToBeUpdated.countryentity = country_id;
    // ToBeUpdated.stateentity = state_id;
    await ToBeUpdated.save();
    return ToBeUpdated;
  }

  async createnewcountry(country: string): Promise<CountryEntity> {
    const NewCountry = new CountryEntity();

    NewCountry.country = country;

    await NewCountry.save();

    return NewCountry;
  }
  async createnewstate(id, state: string): Promise<StateEntity> {
    const NewState = new StateEntity();

    NewState.state = state;
    NewState.countryentity = id;

    await NewState.save();

    return NewState;
  }

  async getuserprofile(user: UserEntity) {
    const query = this.createQueryBuilder('tuser');
    query.where('tuser.userentityId=:userId', { userId: user.id });
    const getprofile = await query.getMany();

    return getprofile;
  }
}
