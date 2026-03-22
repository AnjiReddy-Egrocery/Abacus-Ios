import { TestBed } from '@angular/core/testing';

import { CartMangerSewrvice } from './cart-manger-sewrvice';

describe('CartMangerSewrvice', () => {
  let service: CartMangerSewrvice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartMangerSewrvice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
