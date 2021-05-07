import { Repository, EntityRepository } from 'typeorm';

import { UserEntity } from '../auth/user.entity';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserEntity, CountryEntity, StateEntity } from './tuser.entity';

@EntityRepository(TuserEntity)
export class TuserRepository extends Repository<TuserEntity> {
  // Get profile of the current user from database
  async tuserdetails(user: UserEntity): Promise<TuserEntity> {
    return this.findOne({ userEntityId: user.id });
  }

  // Create new profile for given user from database
  async createnewtuser(user: UserEntity): Promise<string> {
    const newTuser = new TuserEntity();
    newTuser.classIntro = '';
    newTuser.address = '';
    newTuser.city = '';
    newTuser.pincode = '000000';
    newTuser.bannerImgUrl = '';
    newTuser.countryEntityCountryId = 1;
    newTuser.stateEntityStateId = 1;
    newTuser.userEntityId = user.id;
    await newTuser.save();
    return newTuser.tuser_id;
  }

  // Update given profile from database
  async updatetuser(
    createTUserDto: CreateTuserDto,
    toBeUpdated: TuserEntity,
    bannerImgUrl: string,
  ): Promise<string> {
    const {
      classIntro,
      country_id,
      state_id,
      address,
      city,
      pincode,
    } = createTUserDto;
    toBeUpdated.classIntro = classIntro;
    toBeUpdated.address = address;
    toBeUpdated.city = city;
    toBeUpdated.pincode = pincode;
    toBeUpdated.bannerImgUrl = bannerImgUrl;
    toBeUpdated.countryEntityCountryId = country_id;
    toBeUpdated.stateEntityStateId = state_id;
    await toBeUpdated.save();
    return toBeUpdated.tuser_id;
  }

  async createnewcountry(country: string): Promise<CountryEntity> {
    const newCountry = new CountryEntity();
    newCountry.country = country;
    await newCountry.save();
    return newCountry;
  }

  async createnewstate(
    country_id: number,
    state: string,
  ): Promise<StateEntity> {
    const newState = new StateEntity();
    newState.state = state;
    newState.countryEntityCountryId = country_id;
    await newState.save();
    return newState;
  }
}
