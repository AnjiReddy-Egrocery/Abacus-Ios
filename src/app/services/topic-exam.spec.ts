import { TestBed } from '@angular/core/testing';

import { TopicExam } from './topic-exam';

describe('TopicExam', () => {
  let service: TopicExam;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicExam);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
