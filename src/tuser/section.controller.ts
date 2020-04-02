import {
  Controller,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
} from '@nestjs/common';

import { SectionService } from './section.service';
import { SectionEntity } from './entity/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('section')
export class SectionController {
  constructor(private sectionservice: SectionService) {}

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewSection(
    @Param('id') id: string,
    @Body() createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return this.sectionservice.createNewSection(id, createsectiondto);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateSection(
    @Param('id') id: string,
    @Body() createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return this.sectionservice.updateSection(id, createsectiondto);
  }

  @Delete('/:id')
  deleteSection(@Param('id') id: string): Promise<void> {
    return this.sectionservice.deleteSection(id);
  }
}
