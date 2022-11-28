import {HasUrlModel} from "./has-url.model";

export interface HouseModel extends HasUrlModel{

  name:	string
  region:	string
  coatOfArms:	string
  words:	string
  titles:	string[]
  seats?:	string[]
  currentLord?:	string
  heir?:	string
  overlord?:	string
  founded?:	string
  founder?:	string
  diedOut?:	string
  ancestralWeapons?:	string[]
  cadetBranches?:	string[]
  swornMembers?:	string[]
}

export interface HouseFilter {
  name?:	string
  region?:	string
  words?:	string
  hasWords?:	boolean
  hasTitles?:	boolean
  hasSeats?:	boolean
  hasDiedOut?:	boolean
  hasAncestralWeapons?:	boolean
}
