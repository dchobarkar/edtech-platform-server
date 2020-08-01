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
  getUserProfile(@GetUser() user: UserEntity): Promise<Object> {
    return this.tUserService.getUserProfile(user);
  }

  @Patch('/update')
  @UseInterceptors(FileInterceptor('bannerimg'))
  @UsePipes(ValidationPipe)
  updateTuser(
    @GetUser() user: UserEntity,
    @UploadedFile() bannerimg: any,
    @Body() createTUserDto: CreateTuserDto,
  ): Promise<Object> {
    return this.tUserService.updateTuser(user, createTUserDto, bannerimg);
  }

  // Only to be used while adding new country or state
  @Post('/country')
  createNewCountry(@Body('country') country: string): Promise<CountryEntity> {
    return this.tUserService.createNewCountry(country);
  }

  @Post('/state/:id')
  createNewState(
    @Param('id') country_id: number,
    @Body('state') state: string,
  ): Promise<StateEntity> {
    return this.tUserService.createNewState(country_id, state);
  }
}
