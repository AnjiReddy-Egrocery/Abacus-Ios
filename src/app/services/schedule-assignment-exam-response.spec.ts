import { TestBed } from '@angular/core/testing';

import { ScheduleAssignmentExamResponse } from './schedule-assignment-exam-response';

describe('ScheduleAssignmentExamResponse', () => {
  let service: ScheduleAssignmentExamResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleAssignmentExamResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
