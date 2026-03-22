import { TestBed } from '@angular/core/testing';

import { PhonePayApi } from './phone-pay-api';

describe('PhonePayApi', () => {
  let service: PhonePayApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhonePayApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
