import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CharacterFilter, CharacterModel } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends GenericService<
  CharacterModel,
  CharacterFilter
> {
  protected url = '/characters';

  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }
}
