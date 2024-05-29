import { TestBed } from '@angular/core/testing';

import { GtformService } from './gtform.service';

describe('GtformService', () => {
  let service: GtformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
