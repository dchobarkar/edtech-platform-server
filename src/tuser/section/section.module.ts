import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionRepository } from '../../repository/section.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SectionRepository])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
