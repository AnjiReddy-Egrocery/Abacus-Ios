import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetPurchasedListViewResultPage } from './worksheet-purchased-list-view-result.page';

describe('WorksheetPurchasedListViewResultPage', () => {
  let component: WorksheetPurchasedListViewResultPage;
  let fixture: ComponentFixture<WorksheetPurchasedListViewResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetPurchasedListViewResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
