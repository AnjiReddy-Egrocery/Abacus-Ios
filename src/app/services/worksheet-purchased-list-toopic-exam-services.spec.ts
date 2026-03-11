import { TestBed } from '@angular/core/testing';

import { WorksheetPurchasedListToopicExamServices } from './worksheet-purchased-list-toopic-exam-services';

describe('WorksheetPurchasedListToopicExamServices', () => {
  let service: WorksheetPurchasedListToopicExamServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetPurchasedListToopicExamServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
