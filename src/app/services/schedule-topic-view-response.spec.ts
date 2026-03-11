import { TestBed } from '@angular/core/testing';

import { ScheduleTopicViewResponse } from './schedule-topic-view-response';

describe('ScheduleTopicViewResponse', () => {
  let service: ScheduleTopicViewResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTopicViewResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
