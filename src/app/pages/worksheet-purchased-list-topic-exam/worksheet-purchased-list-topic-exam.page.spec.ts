import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetPurchasedListTopicExamPage } from './worksheet-purchased-list-topic-exam.page';

describe('WorksheetPurchasedListTopicExamPage', () => {
  let component: WorksheetPurchasedListTopicExamPage;
  let fixture: ComponentFixture<WorksheetPurchasedListTopicExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetPurchasedListTopicExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
