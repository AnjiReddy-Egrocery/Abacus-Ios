import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppsettingPage } from './appsetting.page';

describe('AppsettingPage', () => {
  let component: AppsettingPage;
  let fixture: ComponentFixture<AppsettingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
