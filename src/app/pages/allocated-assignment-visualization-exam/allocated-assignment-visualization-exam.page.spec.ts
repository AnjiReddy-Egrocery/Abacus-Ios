import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedAssignmentVisualizationExamPage } from './allocated-assignment-visualization-exam.page';

describe('AllocatedAssignmentVisualizationExamPage', () => {
  let component: AllocatedAssignmentVisualizationExamPage;
  let fixture: ComponentFixture<AllocatedAssignmentVisualizationExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedAssignmentVisualizationExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
