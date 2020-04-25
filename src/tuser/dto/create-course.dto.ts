import { MaxLength, Matches } from 'class-validator';

export class CreateCourseDto {
  @MaxLength(100)
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  coursetitle: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  courseintro: string;

  @Matches(/^[1-9]$/)
  targetaudience_id: number;

  @Matches(/^[1-9]$/)
  subject_id: number;

  @Matches(/^[0-9]+$/)
  fee: number;
}
