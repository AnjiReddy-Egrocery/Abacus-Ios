import { TestBed } from '@angular/core/testing';

import { WorksheetCourseDetailResponse } from './worksheet-course-detail-response';

describe('WorksheetCourseDetailResponse', () => {
  let service: WorksheetCourseDetailResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetCourseDetailResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
