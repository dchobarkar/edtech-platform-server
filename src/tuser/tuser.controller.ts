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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { UserEntity } from '../auth/user.entity';
import { TuserService } from './tuser.service';
import { CountryEntity, StateEntity } from '../entity/tuser.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tuser')
@UseGuards(AuthGuard())
export class TuserController {
  constructor(private tuserservice: TuserService) {}

  @Get('/profile')
  getUserProfile(@GetUser() user: UserEntity): Promise<Object> {
    return this.tuserservice.getUserProfile(user);
  }

  @Patch('/update')
  @UseInterceptors(FileInterceptor('bannerimg'))
  @UsePipes(ValidationPipe)
  updateTuser(
    @GetUser() user: UserEntity,
    @Body() createtuserdto: CreateTuserDto,
    @UploadedFile() bannerimg: any,
  ): Promise<Object> {
    return this.tuserservice.updateTuser(user, createtuserdto, bannerimg);
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
