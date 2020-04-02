import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sectiontitle: string;

  @IsString()
  sectionintro: string;
}
