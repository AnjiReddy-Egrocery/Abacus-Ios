import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizationQuizExamPage } from './visualization-quiz-exam.page';

describe('VisualizationQuizExamPage', () => {
  let component: VisualizationQuizExamPage;
  let fixture: ComponentFixture<VisualizationQuizExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationQuizExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
