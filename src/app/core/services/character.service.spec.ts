import {TestBed} from '@angular/core/testing';
import {CharacterService} from './character.service';
import {CharacterModel} from "../models/character.model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpMethod} from "../enums/http-method";

describe('CharacterService', () => {
  let characterService: CharacterService;
  const url = '/characters';
  const perCharacterUrl = 'https://www.anapioficeandfire.com/api/characters/1'
  let httpClient: HttpTestingController;
  const character: CharacterModel = {
    books: ['https://www.anapioficeandfire.com/api/books/2'], culture: 'Ewe', gender: 'Male',
    url: 'https://www.anapioficeandfire.com/api/characters/1',
    name: 'Braavosi',
    born: '1990'
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });
    characterService = TestBed.inject(CharacterService);
    httpClient = TestBed.inject(HttpTestingController);
  });
  it('should get a character by character url', () => {
    characterService.findOne(perCharacterUrl).subscribe(character => {
      expect(character).withContext('character must be present');
      expect(character?.name).withContext('name of character must be equal to ').toEqual('Braavosi');
    })
    let request = httpClient.expectOne(perCharacterUrl);
    const httpRequest = request.request
    expect(httpRequest.url).toEqual(perCharacterUrl)
    expect(httpRequest.method).withContext('Request must be a GET request').toEqual(HttpMethod.GET)
    request.flush(character)
  });
  it('should get all characters', () => {
    characterService.findAll().subscribe(characters => {
      expect(characters).toBeTruthy();
      expect(characters.length).withContext('Incorrect number of characters').toEqual(1)
      expect(characters.find(character => character.name === 'Braavosi')?.name)
        .withContext('Name of character must be Braavosi').toBe('Braavosi')
    })
    const request = httpClient.expectOne(url)
    const httpRequest = request.request
    request.flush([character])
  });
  it('should confirm if pagination is correct', () => {
    let url = '/characters?page=1&pageSize=10'
    characterService.findAll({page: '1', pageSize: '10'}).subscribe(
      character => {
      }
    );
    const request = httpClient.expectOne(url)
    const httpRequest = request.request;
    expect(httpRequest.params.get('page')).withContext('the page  must be 1').toEqual('1')
    expect(httpRequest.params.get('pageSize')).withContext('the page size must be ').toEqual('10')
    expect(httpRequest.method).toBe('GET')
    expect(httpRequest.url).toBe('/characters')
    request.flush({success: true});
  });
  it('should confirm if filter is correct', () => {
    let url = '/characters?name=Braavosi'
    characterService.findAll(undefined, {name: 'Braavosi'}).subscribe(
      character => {
      }
    );
    const request = httpClient.expectOne(url)
    const httpRequest = request.request;
    expect(httpRequest.params.get('name')).withContext('filter param must be name').toEqual('Braavosi')
    request.flush({success: true});
  });
  it('should be created', () => {
    expect(characterService).toBeTruthy();
  });
  afterEach(() => {
    httpClient.verify()
  })
});
