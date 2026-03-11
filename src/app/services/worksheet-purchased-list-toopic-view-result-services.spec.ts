import { TestBed } from '@angular/core/testing';

import { WorksheetPurchasedListToopicViewResultServices } from './worksheet-purchased-list-toopic-view-result-services';

describe('WorksheetPurchasedListToopicViewResultServices', () => {
  let service: WorksheetPurchasedListToopicViewResultServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetPurchasedListToopicViewResultServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
