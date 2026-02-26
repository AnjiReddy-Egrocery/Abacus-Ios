import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefoundpolicyPage } from './refoundpolicy.page';

describe('RefoundpolicyPage', () => {
  let component: RefoundpolicyPage;
  let fixture: ComponentFixture<RefoundpolicyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RefoundpolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
