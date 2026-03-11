import { TestBed } from '@angular/core/testing';

import { WorksheetListServices } from './worksheet-list-services';

describe('WorksheetListServices', () => {
  let service: WorksheetListServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksheetListServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
