import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetPurchasedListViewPracticesPage } from './worksheet-purchased-list-view-practices.page';

describe('WorksheetPurchasedListViewPracticesPage', () => {
  let component: WorksheetPurchasedListViewPracticesPage;
  let fixture: ComponentFixture<WorksheetPurchasedListViewPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetPurchasedListViewPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
