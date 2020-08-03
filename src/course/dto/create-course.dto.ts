import { MaxLength, Matches } from 'class-validator';

export class CreateCourseDto {
  @MaxLength(100)
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  courseTitle: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  courseIntro: string;

  @Matches(/^[1-9]$/)
  targetAudience_id: number;

  @Matches(/^[1-9]$/)
  subject_id: number;

  @Matches(/^[0-9]+$/)
  fee: number;
}
