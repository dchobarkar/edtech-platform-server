import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @Length(1, 50)
  coursetitle: string;

  @IsString()
  courseintro: string;

  @IsNotEmpty()
  targetaudience_id: number;

  @IsNotEmpty()
  subject_id: number;

  @IsNotEmpty()
  fee: number;
}
