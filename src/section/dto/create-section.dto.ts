import { MaxLength, Matches } from 'class-validator';

export class CreateSectionDto {
  @MaxLength(100)
  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]+$/,
  )
  sectiontitle: string;

  @Matches(
    /^[\w\s !@#%&-=;:'",/<> \\ \^ \$ \. \| \? \* \+ \( \) \[ \] \{ \} ]*$/,
  )
  sectionintro: string;
}
