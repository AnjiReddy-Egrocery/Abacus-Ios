import { TestBed } from '@angular/core/testing';

import { ScheduleAssignmentViewTopicResultResponse } from './schedule-assignment-view-topic-result-response';

describe('ScheduleAssignmentViewTopicResultResponse', () => {
  let service: ScheduleAssignmentViewTopicResultResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleAssignmentViewTopicResultResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
