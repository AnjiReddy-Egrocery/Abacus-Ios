import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersInfoPagePage } from './orders-info-page.page';

describe('OrdersInfoPagePage', () => {
  let component: OrdersInfoPagePage;
  let fixture: ComponentFixture<OrdersInfoPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersInfoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
