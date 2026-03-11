import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentVisualizationExamPage } from './schedules-assignment-visualization-exam.page';

describe('SchedulesAssignmentVisualizationExamPage', () => {
  let component: SchedulesAssignmentVisualizationExamPage;
  let fixture: ComponentFixture<SchedulesAssignmentVisualizationExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentVisualizationExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
