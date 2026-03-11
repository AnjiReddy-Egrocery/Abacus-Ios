import { TestBed } from '@angular/core/testing';

import { ScheduleTopicExamResponse } from './schedule-topic-exam-response';

describe('ScheduleTopicExamResponse', () => {
  let service: ScheduleTopicExamResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTopicExamResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
