import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserService } from './tuser.service';
import { TuserEntity, CountryEntity, StateEntity } from './entity/tuser.entity';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tuser')
@UseGuards(AuthGuard())
export class TuserController {
  constructor(private tuserservice: TuserService) {}

  @Get('/profile')
  getUserProfile(@GetUser() user: UserEntity): Promise<TuserEntity> {
    return this.tuserservice.getUserProfile(user);
  }

  @Patch('/update')
  @UsePipes(ValidationPipe)
  updateTuser(
    @GetUser() user: UserEntity,
    @Body() createtuserdto: CreateTuserDto,
  ): Promise<TuserEntity> {
    return this.tuserservice.updateTuser(user, createtuserdto);
  }

  @Post('/country')
  createNewCountry(@Body('country') country: string): Promise<CountryEntity> {
    return this.tuserservice.createNewCountry(country);
  }

  @Post('/state/:id')
  createNewState(
    @Param('id') id: number,
    @Body('state') state: string,
  ): Promise<StateEntity> {
    return this.tuserservice.createNewState(id, state);
  }
}
