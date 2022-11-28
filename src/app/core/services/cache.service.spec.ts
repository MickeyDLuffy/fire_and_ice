import {TestBed} from '@angular/core/testing';
import {CacheServiceImpl} from './cache-service-impl.service';

describe('CacheService', () => {
  let service: CacheServiceImpl;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheServiceImpl);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
