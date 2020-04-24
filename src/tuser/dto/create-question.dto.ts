import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  MaxLength,
  NotContains,
} from 'class-validator';

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

  @IsNumberString()
  @MaxLength(1)
  @NotContains('5')
  @NotContains('6')
  @NotContains('7')
  @NotContains('8')
  @NotContains('9')
  @NotContains('0')
  answer: string;
}
