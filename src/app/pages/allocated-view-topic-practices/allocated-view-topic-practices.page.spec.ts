import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedViewTopicPracticesPage } from './allocated-view-topic-practices.page';

describe('AllocatedViewTopicPracticesPage', () => {
  let component: AllocatedViewTopicPracticesPage;
  let fixture: ComponentFixture<AllocatedViewTopicPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedViewTopicPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
