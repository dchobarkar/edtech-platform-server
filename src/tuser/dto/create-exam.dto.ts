import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateExamDto {
  @IsString()
  @Length(1, 50)
  examtitle: string;

  @IsString()
  examinstruction: string;

  @IsNotEmpty()
  duration: number;
}
