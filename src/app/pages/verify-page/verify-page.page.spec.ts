import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyPagePage } from './verify-page.page';

describe('VerifyPagePage', () => {
  let component: VerifyPagePage;
  let fixture: ComponentFixture<VerifyPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
