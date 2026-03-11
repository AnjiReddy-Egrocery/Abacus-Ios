import { TestBed } from '@angular/core/testing';

import { WorksheetPurchasedListToopicViewServices } from './worksheet-purchased-list-toopic-view-services';

describe('WorksheetPurchasedListToopicViewServices', () => {
  let service: WorksheetPurchasedListToopicViewServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetPurchasedListToopicViewServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
