import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetPurchasedListTopicPage } from './worksheet-purchased-list-topic.page';

describe('WorksheetPurchasedListTopicPage', () => {
  let component: WorksheetPurchasedListTopicPage;
  let fixture: ComponentFixture<WorksheetPurchasedListTopicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetPurchasedListTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
