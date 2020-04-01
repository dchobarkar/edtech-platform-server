import { IsNotEmpty, IsUrl, IsString, IsIn } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  que: string;

  @IsNotEmpty()
  @IsString()
  opt1: string;

  @IsNotEmpty()
  @IsString()
  opt2: string;

  @IsNotEmpty()
  @IsString()
  opt3: string;

  @IsNotEmpty()
  @IsString()
  opt4: string;

  queimage: string;

  @IsNotEmpty()
  // @IsIn([1, 2, 3, 4])
  answer: number;
}
