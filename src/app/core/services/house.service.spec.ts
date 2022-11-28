import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpMethod} from "../enums/http-method";
import {HouseModel} from "../models/house.model";

describe('HouseService', () => {
  let service: HouseService;
  let httpController: HttpTestingController;
  const byIdUrl = 'https://www.anapioficeandfire.com/api/houses/1'
  const url = '/houses'
  const house: HouseModel = {
    coatOfArms: 'A golden wreath, on a blue field with a gold border',
    name: 'House Algood',
    region: 'The Westerlands',
    titles: ['Lord Paramount of the Trident'],
    words: 'Arh',
    url: 'https://www.anapioficeandfire.com/api/houses/1'

  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HouseService]
    });
    service = TestBed.inject(HouseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should get a house by house url',  () => {
    service.findOne(byIdUrl).subscribe(house => {
      expect(house).withContext('house must be present');
      expect(house?.region).withContext('region of house must be equal to ').toEqual('The Westerlands');
    })

    let request = httpController.expectOne(byIdUrl);
    const httpRequest = request.request
    expect(httpRequest.url).toEqual(byIdUrl)
    expect(httpRequest.method).withContext('Request must be a GET request').toEqual(HttpMethod.GET)
    request.flush(house)
  });

  it('should get all houses',  () => {
    service.findAll().subscribe(houses => {
      expect(houses).toBeTruthy();
      expect(houses.length).withContext('Incorrect number of houses').toEqual(1)
      expect(houses.find(house => house.name==='House Algood')?.name)
        .withContext('Name of house must be House Algood').toBe('House Algood')
    })
    const request = httpController.expectOne(url)
    const httpRequest = request.request
    expect(httpRequest.method).withContext('Request must be a GET request').toEqual(HttpMethod.GET)
    request.flush([house])
  });

  it('should confirm if pagination is correct',  () => {
    let url = '/houses?page=1&pageSize=10'
    service.findAll({page: '1', pageSize: '10'}).subscribe(
      house => {
      }
    );
    const request = httpController.expectOne(url)
    const httpRequest = request.request;
    expect( httpRequest.params.get('page')).withContext('the page  must be 1').toEqual('1')
    expect( httpRequest.params.get('pageSize')).withContext('the page size must be ').toEqual('10')
    expect(httpRequest.method).toBe('GET')
    expect(httpRequest.url).toBe('/houses')
    request.flush({ success: true });
  });

  it('should confirm if filter is correct',  () => {
    let url = `/houses?region=Westerlands`
    service.findAll(undefined, {region: 'Westerlands'}).subscribe(
      house => {
      }
    );
    const request = httpController.expectOne(url)
    const httpRequest = request.request;
    expect( httpRequest.params.get('region')).withContext('filter param must be region').toEqual('Westerlands')
    request.flush({ success: true });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
