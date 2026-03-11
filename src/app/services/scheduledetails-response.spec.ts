import { TestBed } from '@angular/core/testing';

import { ScheduledetailsResponse } from './scheduledetails-response';

describe('ScheduledetailsResponse', () => {
  let service: ScheduledetailsResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledetailsResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
