import { TestBed } from '@angular/core/testing';

import { ServiceAPIService } from './service-api.service';

describe('ServiceAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAPIService = TestBed.get(ServiceAPIService);
    expect(service).toBeTruthy();
  });
});
