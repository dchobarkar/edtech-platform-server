import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../auth/user.entity';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserRepository } from './tuser.repository';
import { CountryEntity, StateEntity } from './tuser.entity';

import { AwsHelper } from 'src/utils/AwsHelper';

@Injectable()
export class TuserService {
  constructor(
    @InjectRepository(TuserRepository)
    private tUserRepository: TuserRepository,
    private awsHelper: AwsHelper,
  ) {}

  async getUserProfile(user: UserEntity): Promise<Object> {
    const temptuserinfo = await this.tUserRepository.tuserdetails(user);

    // create a tuserentity if there is no profile present
    let temptuserid = null;
    if (temptuserinfo === undefined) {
      temptuserid = await this.tUserRepository.createnewtuser(user);
    } else {
      temptuserid = temptuserinfo.tuser_id;
    }

    // return needed information
    const tuserprofile = await this.tUserRepository.findOne(
      { tuser_id: temptuserid },
      {
        relations: ['userentity', 'countryentity', 'stateentity'],
      },
    );
    const userprofile = {
      firstname: tuserprofile.userentity.firstname,
      lastname: tuserprofile.userentity.lastname,
      classname: tuserprofile.userentity.classname,
      classintro: tuserprofile.classintro,
      mobile: tuserprofile.userentity.mobile,
      email: tuserprofile.userentity.email,
      country: tuserprofile.countryentity.country,
      country_id: tuserprofile.countryentity.country_id,
      state: tuserprofile.stateentity.state,
      state_id: tuserprofile.stateentity.state_id,
      address: tuserprofile.address,
      city: tuserprofile.city,
      pincode: tuserprofile.pincode,
      bannerimgurl: tuserprofile.bannerimgurl,
    };
    return userprofile;
  }

  async updateTuser(
    user: UserEntity,
    createTUserDto: CreateTuserDto,
    bannerimg: any,
  ): Promise<Object> {
    const tobeupdated = await this.tUserRepository.tuserdetails(user);

    // upload bannerimg to aws and get its url
    let bannerimgurl = tobeupdated.bannerimgurl;
    if (bannerimg) {
      const folderPath = `${tobeupdated.userentityId}/${'bannerimg'}`;
      const imgData = await this.awsHelper.UPLOAD_IMAGE(bannerimg, folderPath);
      bannerimgurl = imgData.Location;
    }

    // update tuserprofile
    const tuserid = await this.tUserRepository.updatetuser(
      createTUserDto,
      tobeupdated,
      bannerimgurl,
    );

    // return needed information
    const tempupdatedtuserprofile = await this.tUserRepository.findOne(
      { tuser_id: tuserid },
      {
        relations: ['countryentity', 'stateentity'],
      },
    );
    const updatedtuserprofile = {
      classintro: tempupdatedtuserprofile.classintro,
      country: tempupdatedtuserprofile.countryentity.country,
      country_id: tempupdatedtuserprofile.countryentity.country_id,
      state: tempupdatedtuserprofile.stateentity.state,
      state_id: tempupdatedtuserprofile.stateentity.state_id,
      address: tempupdatedtuserprofile.address,
      city: tempupdatedtuserprofile.city,
      pincode: tempupdatedtuserprofile.pincode,
      bannerimgurl: tempupdatedtuserprofile.bannerimgurl,
    };
    return updatedtuserprofile;
  }

  async createNewCountry(country: string): Promise<CountryEntity> {
    return this.tUserRepository.createnewcountry(country);
  }

  async createNewState(
    country_id: number,
    state: string,
  ): Promise<StateEntity> {
    return this.tUserRepository.createnewstate(country_id, state);
  }
}
