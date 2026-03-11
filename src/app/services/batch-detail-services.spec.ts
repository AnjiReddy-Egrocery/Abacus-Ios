import { TestBed } from '@angular/core/testing';

import { BatchDetailServices } from './batch-detail-services';

describe('BatchDetailServices', () => {
  let service: BatchDetailServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchDetailServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
