import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTuserDto } from './dto/create-tuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TuserRepository } from './repository/tuser.repository';
import { TuserEntity, CountryEntity, StateEntity } from './entity/tuser.entity';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TuserService {
  constructor(
    @InjectRepository(TuserRepository)
    private tuserrepository: TuserRepository,
  ) {}

  async getAllTusers(): Promise<TuserEntity[]> {
    return this.tuserrepository.getalltuser();
  }

  async getTuserById(id: string): Promise<TuserEntity> {
    const found = await this.tuserrepository.findOne(id);

    if (!found) {
      throw new NotFoundException('The User you are searching is not Present');
    }

    return found;
  }

  async createNewTuser(
    createtuserdto: CreateTuserDto,
    user: UserEntity,
  ): Promise<TuserEntity> {
    return this.tuserrepository.createtuser(createtuserdto, user);
  }

  async deleteTuser(id: string): Promise<void> {
    const result = await this.tuserrepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Item to be deleted is not present');
    }
  }

  async updateTuser(
    id: string,
    createtuserdto: CreateTuserDto,
  ): Promise<TuserEntity> {
    const ToBeUpdated = await this.getTuserById(id);
    return this.tuserrepository.updatetuser(createtuserdto, ToBeUpdated);
  }

  async createNewCountry(country: string): Promise<CountryEntity> {
    return this.tuserrepository.createnewcountry(country);
  }

  async createNewState(id, state: string): Promise<StateEntity> {
    return this.tuserrepository.createnewstate(id, state);
  }

  async getUserProfile(user: UserEntity) {
    const onlyprofile = await this.tuserrepository.getuserprofile(user);

    if (onlyprofile.length === 0) {
      const temp = {
        classintro: '',
        address: '',
        city: '',
        pincode: 0,
        bannerimgurl: '',
        country_id: null,
        state_id: null,
      };
      return this.tuserrepository.createtuser(temp, user);
    } else {
      const userprofile = await this.tuserrepository.findOne(
        { id: onlyprofile[0].id },
        // course_id: course.course_id },
        {
          relations: ['userentity'],
        },
      );

      const profile = userprofile;

      // delete profile.id,
      delete profile.userentity.id;
      delete profile.userentity.password;
      delete profile.userentity.salt;
      delete profile.userentityId;

      return profile;
    }
  }
}
