import { IsString, IsNotEmpty, MaxLength, IsUrl } from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lecturetitle: string;

  @IsString()
  lectureintro: string;

  @IsUrl()
  lecturevideo: string;
}
