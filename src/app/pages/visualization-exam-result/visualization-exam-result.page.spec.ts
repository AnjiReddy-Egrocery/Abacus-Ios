import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizationExamResultPage } from './visualization-exam-result.page';

describe('VisualizationExamResultPage', () => {
  let component: VisualizationExamResultPage;
  let fixture: ComponentFixture<VisualizationExamResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationExamResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
