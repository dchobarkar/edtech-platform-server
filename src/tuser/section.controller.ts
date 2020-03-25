import {
  Controller,
  Get,
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

@Controller('/section')
export class SectionController {
  constructor(private sectionservice: SectionService) {}

  @Get()
  getAllSections(): Promise<SectionEntity[]> {
    return this.sectionservice.getAllSections();
  }

  @Get('/:id')
  getSectionById(@Param('id') id: string): Promise<SectionEntity> {
    return this.sectionservice.getSectionById(id);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  createNewSection(
    @Param('id') id,
    @Body() createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return this.sectionservice.createNewSection(id, createsectiondto);
  }

  @Delete('/:id')
  deletesection(@Param('id') id: string): Promise<void> {
    return this.sectionservice.deleteSection(id);
  }

  @Patch('/:id/update')
  updateSection(
    @Param('id') id: string,
    @Body() createsectiondto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return this.sectionservice.updateSection(id, createsectiondto);
  }
}
