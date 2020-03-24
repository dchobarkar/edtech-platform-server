import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTuserDto } from './dto/create-tuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TuserRepository } from './repository/tuser.repository';
import { TuserEntity } from './entity/tuser.entity';

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

  async createNewTuser(createtuserdto: CreateTuserDto): Promise<TuserEntity> {
    return this.tuserrepository.createtuser(createtuserdto);
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
}
