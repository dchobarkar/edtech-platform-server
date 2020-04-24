import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lecturetitle: string;

  @IsString()
  lectureintro: string;
}
