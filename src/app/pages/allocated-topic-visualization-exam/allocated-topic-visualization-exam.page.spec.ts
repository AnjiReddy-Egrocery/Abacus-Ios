import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedTopicVisualizationExamPage } from './allocated-topic-visualization-exam.page';

describe('AllocatedTopicVisualizationExamPage', () => {
  let component: AllocatedTopicVisualizationExamPage;
  let fixture: ComponentFixture<AllocatedTopicVisualizationExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedTopicVisualizationExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
