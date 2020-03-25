import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  examtitle: string;

  @IsString()
  examinstruction: string;

  @IsNotEmpty()
  duration: number;
}
