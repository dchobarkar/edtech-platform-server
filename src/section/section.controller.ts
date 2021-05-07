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

import { UserEntity } from '../auth/user.entity';

import { CreateSectionDto } from './dto/create-section.dto';
import { SectionService } from './section.service';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('section')
@UseGuards(AuthGuard())
export class SectionController {
  constructor(private sectionService: SectionService) {}

  // Create new section
  @Post('/:course_id')
  @UsePipes(ValidationPipe)
  createNewSection(
    @GetUser() user: UserEntity,
    @Param('course_id') course_id: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<object> {
    return this.sectionService.createNewSection(course_id, createSectionDto);
  }

  // Update given section
  @Patch('/:section_id/update')
  @UsePipes(ValidationPipe)
  updateSection(
    @GetUser() user: UserEntity,
    @Param('section_id') section_id: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<object> {
    return this.sectionService.updateSection(section_id, createSectionDto);
  }

  // Delete given section
  @Delete('/:section_id')
  deleteSection(
    @GetUser() user: UserEntity,
    @Param('section_id') section_id: string,
  ): Promise<void> {
    return this.sectionService.deleteSection(section_id);
  }
}
