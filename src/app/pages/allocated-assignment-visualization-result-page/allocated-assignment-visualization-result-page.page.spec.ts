import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedAssignmentVisualizationResultPagePage } from './allocated-assignment-visualization-result-page.page';

describe('AllocatedAssignmentVisualizationResultPagePage', () => {
  let component: AllocatedAssignmentVisualizationResultPagePage;
  let fixture: ComponentFixture<AllocatedAssignmentVisualizationResultPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedAssignmentVisualizationResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
