import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentExamPage } from './schedules-assignment-exam.page';

describe('SchedulesAssignmentExamPage', () => {
  let component: SchedulesAssignmentExamPage;
  let fixture: ComponentFixture<SchedulesAssignmentExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
