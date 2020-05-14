import {
  Controller,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateSectionDto } from '../dto/create-section.dto';
import { SectionService } from './section.service';
import { UserEntity } from '../../auth/user.entity';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('section')
@UseGuards(AuthGuard())
export class SectionController {
  constructor(private sectionservice: SectionService) {}

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewSection(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() createsectiondto: CreateSectionDto,
  ): Promise<Object> {
    return this.sectionservice.createNewSection(id, createsectiondto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateSection(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() createsectiondto: CreateSectionDto,
  ): Promise<Object> {
    return this.sectionservice.updateSection(id, createsectiondto);
  }

  @Delete('/:id')
  deleteSection(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<void> {
    return this.sectionservice.deleteSection(id);
  }
}
