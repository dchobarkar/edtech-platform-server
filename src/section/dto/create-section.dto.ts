import { MaxLength, Matches } from 'class-validator';

export class CreateSectionDto {
  @MaxLength(100)
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  sectionTitle: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  sectionIntro: string;
}
