import { TestBed } from '@angular/core/testing';

import { ScheduleAssignmentViewTopicResponse } from './schedule-assignment-view-topic-response';

describe('ScheduleAssignmentViewTopicResponse', () => {
  let service: ScheduleAssignmentViewTopicResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleAssignmentViewTopicResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
