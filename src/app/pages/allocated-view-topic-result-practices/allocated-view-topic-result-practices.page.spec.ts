import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedViewTopicResultPracticesPage } from './allocated-view-topic-result-practices.page';

describe('AllocatedViewTopicResultPracticesPage', () => {
  let component: AllocatedViewTopicResultPracticesPage;
  let fixture: ComponentFixture<AllocatedViewTopicResultPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedViewTopicResultPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
