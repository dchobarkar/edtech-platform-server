import { MaxLength, Matches } from 'class-validator';

export class CreateLectureDto {
  @MaxLength(100)
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  lectureTitle: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  lectureIntro: string;
}
