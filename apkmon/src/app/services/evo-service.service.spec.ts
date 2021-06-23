import { TestBed } from '@angular/core/testing';

import { EvoServiceService } from './evo-service.service';

describe('EvoServiceService', () => {
  let service: EvoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
