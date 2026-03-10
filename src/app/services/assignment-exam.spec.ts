import { TestBed } from '@angular/core/testing';

import { AssignmentExam } from './assignment-exam';

describe('AssignmentExam', () => {
  let service: AssignmentExam;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentExam);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
