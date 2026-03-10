import { TestBed } from '@angular/core/testing';

import { ViewTopicServices } from './view-topic-services';

describe('ViewTopicServices', () => {
  let service: ViewTopicServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTopicServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
