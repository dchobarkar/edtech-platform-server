import { Repository, EntityRepository } from 'typeorm';

import {
  TuserEntity,
  CountryEntity,
  StateEntity,
} from '../entity/tuser.entity';
import { CreateTuserDto } from '../dto/create-tuser.dto';

@EntityRepository(TuserEntity)
export class TuserRepository extends Repository<TuserEntity> {
  async getalltuser(): Promise<TuserEntity[]> {
    const query = this.createQueryBuilder('tuser');
    const getalltuser = await query.getMany();

    return getalltuser;
  }

  async createtuser(createtuserdto: CreateTuserDto): Promise<TuserEntity> {
    const {
      firstname,
      lastname,
      classname,
      intro,
      mobile,
      email,
      address,
      city,
      pincode,
      bannerimgurl,
      country_id,
      state_id,
    } = createtuserdto;

    const NewTuser = new TuserEntity();

    NewTuser.firstname = firstname;
    NewTuser.lastname = lastname;
    NewTuser.classname = classname;
    NewTuser.intro = intro;
    NewTuser.mobile = mobile;
    NewTuser.email = email;
    NewTuser.address = address;
    NewTuser.city = city;
    NewTuser.pincode = pincode;
    NewTuser.bannerimgurl = bannerimgurl;

    NewTuser.countryentity = country_id;
    NewTuser.stateentity = state_id;
    await NewTuser.save();
    return NewTuser;
  }

  async updatetuser(
    createtuserdto: CreateTuserDto,
    ToBeUpdated: TuserEntity,
  ): Promise<TuserEntity> {
    const {
      firstname,
      lastname,
      classname,
      intro,
      mobile,
      email,
      address,
      city,
      pincode,
      bannerimgurl,
      country_id,
      state_id,
    } = createtuserdto;

    ToBeUpdated.firstname = firstname;
    ToBeUpdated.lastname = lastname;
    ToBeUpdated.classname = classname;
    ToBeUpdated.intro = intro;
    ToBeUpdated.mobile = mobile;
    ToBeUpdated.email = email;
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
}
