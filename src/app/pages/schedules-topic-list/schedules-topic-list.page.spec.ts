import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesTopicListPage } from './schedules-topic-list.page';

describe('SchedulesTopicListPage', () => {
  let component: SchedulesTopicListPage;
  let fixture: ComponentFixture<SchedulesTopicListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesTopicListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
