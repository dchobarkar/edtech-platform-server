import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionRepository } from '../../repository/section.repository';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SectionRepository]), AuthModule],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
