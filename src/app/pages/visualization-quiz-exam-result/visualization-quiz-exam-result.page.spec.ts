import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizationQuizExamResultPage } from './visualization-quiz-exam-result.page';

describe('VisualizationQuizExamResultPage', () => {
  let component: VisualizationQuizExamResultPage;
  let fixture: ComponentFixture<VisualizationQuizExamResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationQuizExamResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
