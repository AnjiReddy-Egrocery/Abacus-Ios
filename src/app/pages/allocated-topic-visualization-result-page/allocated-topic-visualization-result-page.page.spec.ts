import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedTopicVisualizationResultPagePage } from './allocated-topic-visualization-result-page.page';

describe('AllocatedTopicVisualizationResultPagePage', () => {
  let component: AllocatedTopicVisualizationResultPagePage;
  let fixture: ComponentFixture<AllocatedTopicVisualizationResultPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedTopicVisualizationResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
