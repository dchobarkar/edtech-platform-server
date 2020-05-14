import { Repository, EntityRepository } from 'typeorm';

import { CreateTuserDto } from '../tuser/dto/create-tuser.dto';
import { UserEntity } from '../auth/user.entity';
import {
  TuserEntity,
  CountryEntity,
  StateEntity,
} from '../entity/tuser.entity';

@EntityRepository(TuserEntity)
export class TuserRepository extends Repository<TuserEntity> {
  async tuserdetails(user: UserEntity): Promise<TuserEntity[]> {
    const query = this.createQueryBuilder('tuser');
    query.where('tuser.userentityId=:userId', { userId: user.id });
    const TuserInfo = await query.getMany();
    return TuserInfo;
  }

  async createnewtuser(
    createtuserdto: CreateTuserDto,
    user: UserEntity,
  ): Promise<String> {
    const {
      classintro,
      country_id,
      state_id,
      address,
      city,
      pincode,
    } = createtuserdto;
    const NewTuser = new TuserEntity();
    NewTuser.classintro = classintro;
    NewTuser.address = address;
    NewTuser.city = city;
    NewTuser.pincode = pincode;
    NewTuser.bannerimgurl = '';
    NewTuser.countryentityCountryId = country_id;
    NewTuser.stateentityStateId = state_id;
    NewTuser.userentityId = user.id;
    await NewTuser.save();
    return NewTuser.tuser_id;
  }

  async updatetuser(
    createtuserdto: CreateTuserDto,
    ToBeUpdated: TuserEntity,
    bannerimgurl: string,
  ): Promise<string> {
    const {
      classintro,
      country_id,
      state_id,
      address,
      city,
      pincode,
    } = createtuserdto;
    ToBeUpdated.classintro = classintro;
    ToBeUpdated.address = address;
    ToBeUpdated.city = city;
    ToBeUpdated.pincode = pincode;
    ToBeUpdated.bannerimgurl = bannerimgurl;
    ToBeUpdated.countryentityCountryId = country_id;
    ToBeUpdated.stateentityStateId = state_id;
    await ToBeUpdated.save();
    return ToBeUpdated.tuser_id;
  }

  async createnewcountry(country: string): Promise<CountryEntity> {
    const NewCountry = new CountryEntity();
    NewCountry.country = country;
    await NewCountry.save();
    return NewCountry;
  }

  async createnewstate(id: number, state: string): Promise<StateEntity> {
    const NewState = new StateEntity();
    NewState.state = state;
    NewState.countryentityCountryId = id;
    await NewState.save();
    return NewState;
  }
}
