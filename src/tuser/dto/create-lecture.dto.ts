import { IsString, Length } from 'class-validator';

export class CreateLectureDto {
  @IsString()
  @Length(1, 50)
  lecturetitle: string;

  @IsString()
  lectureintro: string;

  lecturevideo: string;
}
