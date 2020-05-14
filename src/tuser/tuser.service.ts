import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserRepository } from '../repository/tuser.repository';
import { UserEntity } from '../auth/user.entity';
import { CountryEntity, StateEntity } from '../entity/tuser.entity';

import { AwsHelper } from 'src/utils/AwsHelper';

@Injectable()
export class TuserService {
  constructor(
    @InjectRepository(TuserRepository)
    private tuserrepository: TuserRepository,
    private awsHelper: AwsHelper,
  ) {}

  async getUserProfile(user: UserEntity): Promise<Object> {
    const tuserinfo = await this.tuserrepository.tuserdetails(user);
    let tuserid = null;
    if (tuserinfo.length === 0) {
      const tempuserprofile = {
        classintro: '',
        country_id: 1,
        state_id: 1,
        address: '',
        city: '',
        pincode: '',
      };
      tuserid = await this.tuserrepository.createnewtuser(
        tempuserprofile,
        user,
      );
    } else {
      tuserid = tuserinfo[0].tuser_id;
    }
    const tempuserprofile = await this.tuserrepository.findOne(
      { tuser_id: tuserid },
      {
        relations: ['userentity', 'countryentity', 'stateentity'],
      },
    );
    const userprofile = {
      firstname: tempuserprofile.userentity.firstname,
      lastname: tempuserprofile.userentity.lastname,
      classname: tempuserprofile.userentity.classname,
      classintro: tempuserprofile.classintro,
      mobile: tempuserprofile.userentity.mobile,
      email: tempuserprofile.userentity.email,
      country: tempuserprofile.countryentity.country,
      country_id: tempuserprofile.countryentity.country_id,
      state: tempuserprofile.stateentity.state,
      state_id: tempuserprofile.stateentity.state_id,
      address: tempuserprofile.address,
      city: tempuserprofile.city,
      pincode: tempuserprofile.pincode,
      bannerimgurl: tempuserprofile.bannerimgurl,
    };
    return userprofile;
  }

  async updateTuser(
    uesr: UserEntity,
    createtuserdto: CreateTuserDto,
    bannerimg: any,
  ): Promise<Object> {
    const ToBeUpdated = await this.tuserrepository.tuserdetails(uesr);
    let bannerimgurl = ToBeUpdated[0].bannerimgurl;
    if (bannerimg) {
      const folderPath = `${ToBeUpdated[0].userentityId}/${'bannerimg'}`;
      const imgData = await this.awsHelper.UPLOAD_IMAGE(bannerimg, folderPath);
      bannerimgurl = imgData.Location;
    }
    const tuserid = await this.tuserrepository.updatetuser(
      createtuserdto,
      ToBeUpdated[0],
      bannerimgurl,
    );
    const tempUpdatedUser = await this.tuserrepository.findOne(
      { tuser_id: tuserid },
      {
        relations: ['countryentity', 'stateentity'],
      },
    );
    const updatedUserProfile = {
      classintro: tempUpdatedUser.classintro,
      country: tempUpdatedUser.countryentity.country,
      country_id: tempUpdatedUser.countryentity.country_id,
      state: tempUpdatedUser.stateentity.state,
      state_id: tempUpdatedUser.stateentity.state_id,
      address: tempUpdatedUser.address,
      city: tempUpdatedUser.city,
      pincode: tempUpdatedUser.pincode,
      bannerimgurl: tempUpdatedUser.bannerimgurl,
    };
    return updatedUserProfile;
  }

  async createNewCountry(country: string): Promise<CountryEntity> {
    return this.tuserrepository.createnewcountry(country);
  }

  async createNewState(id: number, state: string): Promise<StateEntity> {
    return this.tuserrepository.createnewstate(id, state);
  }
}
