import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HouseFilter, HouseModel } from '../models/house.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HouseService extends GenericService<HouseModel, HouseFilter> {
  protected url = '/houses';

  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }
}
