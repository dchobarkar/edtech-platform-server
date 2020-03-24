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
} from '@nestjs/common';

import { TuserService } from './tuser.service';
import { CreateTuserDto } from './dto/create-tuser.dto';
import { TuserEntity } from './entity/tuser.entity';

@Controller('/tuser')
export class TuserController {
  constructor(private tuserservice: TuserService) {}

  @Get()
  getAllTuser(): Promise<TuserEntity[]> {
    return this.tuserservice.getAllTusers();
  }

  @Get('/:id')
  getTuserById(@Param('id') id: string): Promise<TuserEntity> {
    return this.tuserservice.getTuserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTuser(@Body() createtuserdto: CreateTuserDto): Promise<TuserEntity> {
    return this.tuserservice.createNewTuser(createtuserdto);
  }

  @Delete('/:id')
  deleteTuser(@Param('id') id: string): Promise<void> {
    return this.tuserservice.deleteTuser(id);
  }

  @Patch('/:id/update')
  updateTuser(
    @Param('id') id: string,
    @Body() createtuserdto: CreateTuserDto,
  ): Promise<TuserEntity> {
    return this.tuserservice.updateTuser(id, createtuserdto);
  }
}
