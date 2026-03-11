import { TestBed } from '@angular/core/testing';

import { ScheduleTopicViewResultResponse } from './schedule-topic-view-result-response';

describe('ScheduleTopicViewResultResponse', () => {
  let service: ScheduleTopicViewResultResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTopicViewResultResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
