import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  sectiontitle: string;

  @IsString()
  sectionintro: string;
}
