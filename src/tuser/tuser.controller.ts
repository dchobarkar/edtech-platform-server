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

import { UserEntity } from '../auth/user.entity';

import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserService } from './tuser.service';
import { CountryEntity, StateEntity } from './tuser.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tuser')
@UseGuards(AuthGuard())
export class TuserController {
  constructor(private tUserService: TuserService) {}

  @Get('/profile')
  getUserProfile(@GetUser() user: UserEntity): Promise<object> {
    return this.tUserService.getUserProfile(user);
  }

  @Patch('/update')
  @UseInterceptors(FileInterceptor('bannerImg'))
  @UsePipes(ValidationPipe)
  updateTuser(
    @GetUser() user: UserEntity,
    @Body() createTUserDto: CreateTuserDto,
    @UploadedFile() bannerImg: any,
  ): Promise<object> {
    return this.tUserService.updateTuser(user, createTUserDto, bannerImg);
  }

  // Only to be used while adding new country or state
  @Post('/country')
  createNewCountry(@Body('country') country: string): Promise<CountryEntity> {
    return this.tUserService.createNewCountry(country);
  }

  @Post('/state/:country_id')
  createNewState(
    @Param('country_id') country_id: number,
    @Body('state') state: string,
  ): Promise<StateEntity> {
    return this.tUserService.createNewState(country_id, state);
  }
}
