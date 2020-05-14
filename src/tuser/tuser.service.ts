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
    const TuserInfo = await this.tuserrepository.tuserdetails(user);
    let tuserid = null;
    if (TuserInfo.length === 0) {
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
      tuserid = TuserInfo[0].tuser_id;
    }
    const TuserProfile = await this.tuserrepository.findOne(
      { tuser_id: tuserid },
      {
        relations: ['userentity', 'countryentity', 'stateentity'],
      },
    );
    const userProfile = {
      firstname: TuserProfile.userentity.firstname,
      lastname: TuserProfile.userentity.lastname,
      classname: TuserProfile.userentity.classname,
      classintro: TuserProfile.classintro,
      mobile: TuserProfile.userentity.mobile,
      email: TuserProfile.userentity.email,
      country: TuserProfile.countryentity.country,
      country_id: TuserProfile.countryentity.country_id,
      state: TuserProfile.stateentity.state,
      state_id: TuserProfile.stateentity.state_id,
      address: TuserProfile.address,
      city: TuserProfile.city,
      pincode: TuserProfile.pincode,
      bannerimgurl: TuserProfile.bannerimgurl,
    };
    return userProfile;
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
    const UpdatedTuserProfile = await this.tuserrepository.findOne(
      { tuser_id: tuserid },
      {
        relations: ['countryentity', 'stateentity'],
      },
    );
    const updatedTuserProfile = {
      classintro: UpdatedTuserProfile.classintro,
      country: UpdatedTuserProfile.countryentity.country,
      country_id: UpdatedTuserProfile.countryentity.country_id,
      state: UpdatedTuserProfile.stateentity.state,
      state_id: UpdatedTuserProfile.stateentity.state_id,
      address: UpdatedTuserProfile.address,
      city: UpdatedTuserProfile.city,
      pincode: UpdatedTuserProfile.pincode,
      bannerimgurl: UpdatedTuserProfile.bannerimgurl,
    };
    return updatedTuserProfile;
  }

  async createNewCountry(country: string): Promise<CountryEntity> {
    return this.tuserrepository.createnewcountry(country);
  }

  async createNewState(id: number, state: string): Promise<StateEntity> {
    return this.tuserrepository.createnewstate(id, state);
  }
}
