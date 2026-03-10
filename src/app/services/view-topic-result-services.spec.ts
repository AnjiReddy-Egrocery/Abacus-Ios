import { TestBed } from '@angular/core/testing';

import { ViewTopicResultServices } from './view-topic-result-services';

describe('ViewTopicResultServices', () => {
  let service: ViewTopicResultServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTopicResultServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
