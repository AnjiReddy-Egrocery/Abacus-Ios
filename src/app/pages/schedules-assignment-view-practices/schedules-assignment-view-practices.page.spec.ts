import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentViewPracticesPage } from './schedules-assignment-view-practices.page';

describe('SchedulesAssignmentViewPracticesPage', () => {
  let component: SchedulesAssignmentViewPracticesPage;
  let fixture: ComponentFixture<SchedulesAssignmentViewPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentViewPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
