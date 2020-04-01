import { IsString, Length } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @Length(1, 50)
  sectiontitle: string;

  @IsString()
  sectionintro: string;
}
