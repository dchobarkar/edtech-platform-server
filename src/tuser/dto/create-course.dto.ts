import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
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
