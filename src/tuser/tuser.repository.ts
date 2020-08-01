import { Repository, EntityRepository } from 'typeorm';

import { UserEntity } from '../auth/user.entity';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserEntity, CountryEntity, StateEntity } from './tuser.entity';

@EntityRepository(TuserEntity)
export class TuserRepository extends Repository<TuserEntity> {
  async tuserdetails(user: UserEntity): Promise<TuserEntity> {
    return this.findOne({ userentityId: user.id });
  }

  async createnewtuser(user: UserEntity): Promise<String> {
    const NewTuser = new TuserEntity();
    NewTuser.classintro = '';
    NewTuser.address = '';
    NewTuser.city = '';
    NewTuser.pincode = '000000';
    NewTuser.bannerimgurl = '';
    NewTuser.countryentityCountryId = 1;
    NewTuser.stateentityStateId = 1;
    NewTuser.userentityId = user.id;
    await NewTuser.save();
    return NewTuser.tuser_id;
  }

  async updatetuser(
    createTUserDto: CreateTuserDto,
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
    } = createTUserDto;
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

  async createnewstate(
    country_id: number,
    state: string,
  ): Promise<StateEntity> {
    const NewState = new StateEntity();
    NewState.state = state;
    NewState.countryentityCountryId = country_id;
    await NewState.save();
    return NewState;
  }
}
