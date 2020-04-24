import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  // @IsString()
  // @IsNotEmpty()
  // @MaxLength(100)
  coursetitle: string;

  // @IsString()
  courseintro: string;

  // @IsNotEmpty()
  targetaudience_id: number;

  // @IsNotEmpty()
  subject_id: number;

  // @IsNotEmpty()
  fee: number;
}
