import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentVisualizationExamResultPage } from './schedules-assignment-visualization-exam-result.page';

describe('SchedulesAssignmentVisualizationExamResultPage', () => {
  let component: SchedulesAssignmentVisualizationExamResultPage;
  let fixture: ComponentFixture<SchedulesAssignmentVisualizationExamResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentVisualizationExamResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
