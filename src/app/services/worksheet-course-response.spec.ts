import { TestBed } from '@angular/core/testing';

import { WorksheetCourseResponse } from './worksheet-course-response';

describe('WorksheetCourseResponse', () => {
  let service: WorksheetCourseResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetCourseResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
