import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersPagePage } from './orders-page.page';

describe('OrdersPagePage', () => {
  let component: OrdersPagePage;
  let fixture: ComponentFixture<OrdersPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
