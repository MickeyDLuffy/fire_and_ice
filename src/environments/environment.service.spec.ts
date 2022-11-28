import { TestBed } from '@angular/core/testing';

import { EnvironmentServiceImpl } from './environment-service-impl.service';

describe('EnvironmentService', () => {
  let service: EnvironmentServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
