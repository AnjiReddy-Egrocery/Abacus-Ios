import { TestBed } from '@angular/core/testing';

import { Verify } from './verify';

describe('Verify', () => {
  let service: Verify;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Verify);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
