import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentViewPracticesResultPage } from './schedules-assignment-view-practices-result.page';

describe('SchedulesAssignmentViewPracticesResultPage', () => {
  let component: SchedulesAssignmentViewPracticesResultPage;
  let fixture: ComponentFixture<SchedulesAssignmentViewPracticesResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentViewPracticesResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
