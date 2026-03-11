import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentExamResultPage } from './schedules-assignment-exam-result.page';

describe('SchedulesAssignmentExamResultPage', () => {
  let component: SchedulesAssignmentExamResultPage;
  let fixture: ComponentFixture<SchedulesAssignmentExamResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentExamResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
