import { TestBed } from '@angular/core/testing';

import { Coursetyperesponse } from './coursetyperesponse';

describe('Coursetyperesponse', () => {
  let service: Coursetyperesponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coursetyperesponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
