import { TestBed } from '@angular/core/testing';

import { GtformDynamicFieldService } from './gtform-dynamic-field.service';

describe('GtformDynamicFieldService', () => {
  let service: GtformDynamicFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtformDynamicFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
