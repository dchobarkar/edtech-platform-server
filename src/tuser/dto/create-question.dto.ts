import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  que: string;

  @IsNotEmpty()
  opt1: string;

  @IsNotEmpty()
  opt2: string;

  @IsNotEmpty()
  opt3: string;

  @IsNotEmpty()
  opt4: string;

  @IsUrl()
  queimage: string;

  @IsNotEmpty()
  answer: number;
}
