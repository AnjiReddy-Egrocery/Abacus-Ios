import { TestBed } from '@angular/core/testing';

import { Scheduleassignmentresponse } from './scheduleassignmentresponse';

describe('Scheduleassignmentresponse', () => {
  let service: Scheduleassignmentresponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Scheduleassignmentresponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
