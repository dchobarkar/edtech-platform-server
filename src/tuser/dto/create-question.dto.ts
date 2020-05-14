import { Matches } from 'class-validator';

export class CreateQuestionDto {
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  que: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  opt1: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  opt2: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  opt3: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  opt4: string;

  @Matches(/^[1 2 3 4]$/)
  answer: string;
}
