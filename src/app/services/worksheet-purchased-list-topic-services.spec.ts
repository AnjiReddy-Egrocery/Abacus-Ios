import { TestBed } from '@angular/core/testing';

import { WorksheetPurchasedListTopicServices } from './worksheet-purchased-list-topic-services';

describe('WorksheetPurchasedListTopicServices', () => {
  let service: WorksheetPurchasedListTopicServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetPurchasedListTopicServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
