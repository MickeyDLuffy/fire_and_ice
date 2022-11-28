import {HasUrlModel} from "./has-url.model";

export interface CharacterModel extends HasUrlModel{
  name:	string
  gender:	string
  culture:	string
  born:	string
  died?:	string
  titles?:	string[]
  aliases?: string[]
  father?:	string
  mother?:	string
  spouse?:	string
  allegiances?: string[]
  books: string[]
  povBooks?: string[]
  tvSeries?: string[]
  playedBy?: string[]
}

export interface CharacterFilter {
  name?:	string
  gender?:	string
  culture?:	string
  born?:	string
  died?:	string
  isAlive?:	boolean
}
