import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOutPagePage } from './check-out-page.page';

describe('CheckOutPagePage', () => {
  let component: CheckOutPagePage;
  let fixture: ComponentFixture<CheckOutPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
