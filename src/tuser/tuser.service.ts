import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserRepository } from '../repository/tuser.repository';
import { TuserEntity, CountryEntity, StateEntity } from '../entity/tuser.entity';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TuserService {
  constructor(
    @InjectRepository(TuserRepository)
    private tuserrepository: TuserRepository,
  ) {}

  async getUserProfile(user: UserEntity): Promise<TuserEntity> {
    const tuserinfo = await this.tuserrepository.tuserdetails(user);
    if (tuserinfo.length === 0) {
      const tempuserprofile = {
        classintro: '',
        country_id: 2,
        state_id: 2,
        address: '',
        city: '',
        pincode: '000000',
        bannerimgurl: '',
      };
      return this.tuserrepository.createnewtuser(tempuserprofile, user);
    } else {
      const userprofile = await this.tuserrepository.findOne(
        { id: tuserinfo[0].id },
        {
          relations: ['userentity'],
        },
      );

      delete userprofile.userentityId;
      delete userprofile.userentity.id;
      delete userprofile.userentity.password;
      delete userprofile.userentity.salt;

      return userprofile;
    }
  }

  async updateTuser(
    uesr: UserEntity,
    createtuserdto: CreateTuserDto,
  ): Promise<TuserEntity> {
    const ToBeUpdated = await this.tuserrepository.tuserdetails(uesr);
    return this.tuserrepository.updatetuser(createtuserdto, ToBeUpdated[0]);
  }

  async createNewCountry(country: string): Promise<CountryEntity> {
    return this.tuserrepository.createnewcountry(country);
  }

  async createNewState(id: number, state: string): Promise<StateEntity> {
    return this.tuserrepository.createnewstate(id, state);
  }
}
