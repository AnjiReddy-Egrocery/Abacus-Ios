import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppProgressPage } from './app-progress.page';

describe('AppProgressPage', () => {
  let component: AppProgressPage;
  let fixture: ComponentFixture<AppProgressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
