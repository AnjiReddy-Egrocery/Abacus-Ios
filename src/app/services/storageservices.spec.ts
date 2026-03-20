import { TestBed } from '@angular/core/testing';

import { Storageservices } from './storageservices';

describe('Storageservices', () => {
  let service: Storageservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Storageservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
