import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { TuserService } from './tuser.service';
import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserEntity, CountryEntity, StateEntity } from './entity/tuser.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from '../auth/user.entity';

@Controller('/tuser')
@UseGuards(AuthGuard())
export class TuserController {
  constructor(private tuserservice: TuserService) {}

  @Get()
  getAllTuser(): Promise<TuserEntity[]> {
    return this.tuserservice.getAllTusers();
  }

  @Get('/profile')
  getUserProfile(@GetUser() user: UserEntity) {
    return this.tuserservice.getUserProfile(user);
  }

  @Get('/:id')
  getTuserById(@Param('id') id: string): Promise<TuserEntity> {
    return this.tuserservice.getTuserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTuser(
    @GetUser() user: UserEntity,
    @Body() createtuserdto: CreateTuserDto,
  ) {
    return this.tuserservice.createNewTuser(createtuserdto, user);
    // console.log('here');
  }

  @Delete('/:id')
  deleteTuser(@Param('id') id: string): Promise<void> {
    return this.tuserservice.deleteTuser(id);
  }

  @Patch('/:id/update')
  updateTuser(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() createtuserdto: CreateTuserDto,
  ): Promise<TuserEntity> {
    return this.tuserservice.updateTuser(id, createtuserdto);
  }

  @Post('/country')
  createNewCountry(@Body('country') country: string): Promise<CountryEntity> {
    return this.tuserservice.createNewCountry(country);
  }

  @Post('/country/:id')
  createNewState(
    @Param('id') id,
    @Body('state') state: string,
  ): Promise<StateEntity> {
    return this.tuserservice.createNewState(id, state);
  }

  // @Get('/userprofile')
  // getUserProfile(@GetUser() user: UserEntity) {
  //   console.log('here');
  //   // return this.tuserservice.getUserProfile(user);
  // }
}
