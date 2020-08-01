import { MaxLength, Matches } from 'class-validator';

export class CreateExamDto {
  @MaxLength(100)
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  examtitle: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  examinstruction: string;

  @Matches(/^[0-9]+$/)
  duration: number;
}
