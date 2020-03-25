import { IsNotEmpty, IsString, MaxLength, IsUrl } from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lecturetitle: string;

  @IsString()
  lectureintro: string;

  @IsNotEmpty()
  @IsUrl()
  lecturevideo: string;
}
