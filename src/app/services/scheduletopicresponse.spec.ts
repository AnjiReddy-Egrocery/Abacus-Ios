import { TestBed } from '@angular/core/testing';

import { Scheduletopicresponse } from './scheduletopicresponse';

describe('Scheduletopicresponse', () => {
  let service: Scheduletopicresponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Scheduletopicresponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
