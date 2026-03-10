import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedTopicExamPage } from './allocated-topic-exam.page';

describe('AllocatedTopicExamPage', () => {
  let component: AllocatedTopicExamPage;
  let fixture: ComponentFixture<AllocatedTopicExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedTopicExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
