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

  async getUserProfile(user: UserEntity): Promise<object> {
    // get tUseEntity from user_id
    const tempTUserInfo = await this.tUserRepository.tuserdetails(user);

    // create a tUserEntity if there is no profile present
    let tempTUserId = null;
    if (tempTUserInfo === undefined) {
      // create new tuserEntity with temporary values
      tempTUserId = await this.tUserRepository.createnewtuser(user);
    } else {
      tempTUserId = tempTUserInfo.tuser_id;
    }

    // return needed information
    const tUserProfile = await this.tUserRepository.findOne(
      { tuser_id: tempTUserId },
      {
        relations: ['userEntity', 'countryEntity', 'stateEntity'],
      },
    );
    const userProfile = {
      firstName: tUserProfile.userEntity.firstName,
      lastName: tUserProfile.userEntity.lastName,
      className: tUserProfile.userEntity.className,
      mobileNo: tUserProfile.userEntity.mobileNo,
      email: tUserProfile.userEntity.email,
      country: tUserProfile.countryEntity.country,
      country_id: tUserProfile.countryEntity.country_id,
      state: tUserProfile.stateEntity.state,
      state_id: tUserProfile.stateEntity.state_id,
      address: tUserProfile.address,
      city: tUserProfile.city,
      pincode: tUserProfile.pincode,
      bannerImgUrl: tUserProfile.bannerImgUrl,
      classIntro: tUserProfile.classIntro,
    };
    return userProfile;
  }

  async updateTuser(
    user: UserEntity,
    createTUserDto: CreateTuserDto,
    bannerImg: any,
  ): Promise<object> {
    // get tUseEntity from user_id
    const toBeUpdated = await this.tUserRepository.tuserdetails(user);

    // upload bannerimg to aws and get its url
    let bannerImgUrl = toBeUpdated.bannerImgUrl;
    if (bannerImg) {
      const folderPath = `${toBeUpdated.userEntityId}/${'bannerImg'}`;
      const imgData = await this.awsHelper.UPLOAD_IMAGE(bannerImg, folderPath);
      bannerImgUrl = imgData.Location;
    }

    // update tuserprofile
    const tUserId = await this.tUserRepository.updatetuser(
      createTUserDto,
      toBeUpdated,
      bannerImgUrl,
    );

    // return needed information
    const tempUpdatedTUserProfile = await this.tUserRepository.findOne(
      { tuser_id: tUserId },
      {
        relations: ['countryEntity', 'stateEntity'],
      },
    );
    const updatedTUserProfile = {
      country: tempUpdatedTUserProfile.countryEntity.country,
      country_id: tempUpdatedTUserProfile.countryEntity.country_id,
      state: tempUpdatedTUserProfile.stateEntity.state,
      state_id: tempUpdatedTUserProfile.stateEntity.state_id,
      address: tempUpdatedTUserProfile.address,
      city: tempUpdatedTUserProfile.city,
      pincode: tempUpdatedTUserProfile.pincode,
      bannerImgUrl: tempUpdatedTUserProfile.bannerImgUrl,
      classIntro: tempUpdatedTUserProfile.classIntro,
    };
    return updatedTUserProfile;
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
