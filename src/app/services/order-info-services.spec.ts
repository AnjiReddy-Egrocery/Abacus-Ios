import { TestBed } from '@angular/core/testing';

import { OrderInfoServices } from './order-info-services';

describe('OrderInfoServices', () => {
  let service: OrderInfoServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderInfoServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
