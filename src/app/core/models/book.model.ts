import {HasUrlModel} from "./has-url.model";

export interface BookModel extends HasUrlModel{

  name:	string
  isbn:	string
  authors: string[]
  numberOfPages: number
  publiser?:	string
  country?:	string
  mediaType?:	string
  released?:	string
  characters?:	string[]
  povCharacters?: string[]
}

export interface BookFilter {
  name?:	string
  fromReleaseDate?:	string
  toReleaseDate?:	string
}
