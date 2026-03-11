import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesDetailsPage } from './schedules-details.page';

describe('SchedulesDetailsPage', () => {
  let component: SchedulesDetailsPage;
  let fixture: ComponentFixture<SchedulesDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
