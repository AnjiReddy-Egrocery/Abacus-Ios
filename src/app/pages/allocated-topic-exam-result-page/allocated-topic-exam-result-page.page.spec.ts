import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedTopicExamResultPagePage } from './allocated-topic-exam-result-page.page';

describe('AllocatedTopicExamResultPagePage', () => {
  let component: AllocatedTopicExamResultPagePage;
  let fixture: ComponentFixture<AllocatedTopicExamResultPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedTopicExamResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
