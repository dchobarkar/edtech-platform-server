import { Repository, EntityRepository } from 'typeorm';

import { TuserEntity } from '../entity/tuser.entity';
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
      mobile,
      email,
      bannerimgurl,
      address,
      country_id,
      state_id,
      city,
      pincode,
      intro,
    } = createtuserdto;

    const NewTuser = new TuserEntity();

    NewTuser.firstname = firstname;
    NewTuser.lastname = lastname;
    NewTuser.classname = classname;
    NewTuser.mobile = mobile;
    NewTuser.email = email;
    NewTuser.bannerimgurl = bannerimgurl;
    NewTuser.address = address;
    NewTuser.country_id = country_id;
    NewTuser.state_id = state_id;
    NewTuser.city = city;
    NewTuser.pincode = pincode;
    NewTuser.intro = intro;

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
      mobile,
      email,
      bannerimgurl,
      address,
      country_id,
      state_id,
      city,
      pincode,
      intro,
    } = createtuserdto;

    ToBeUpdated.firstname = firstname;
    ToBeUpdated.lastname = lastname;
    ToBeUpdated.classname = classname;
    ToBeUpdated.mobile = mobile;
    ToBeUpdated.email = email;
    ToBeUpdated.bannerimgurl = bannerimgurl;
    ToBeUpdated.address = address;
    ToBeUpdated.country_id = country_id;
    ToBeUpdated.state_id = state_id;
    ToBeUpdated.city = city;
    ToBeUpdated.pincode = pincode;
    ToBeUpdated.intro = intro;

    await ToBeUpdated.save();

    return ToBeUpdated;
  }
}
