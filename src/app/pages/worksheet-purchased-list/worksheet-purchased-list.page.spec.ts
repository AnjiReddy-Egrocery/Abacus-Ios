import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetPurchasedListPage } from './worksheet-purchased-list.page';

describe('WorksheetPurchasedListPage', () => {
  let component: WorksheetPurchasedListPage;
  let fixture: ComponentFixture<WorksheetPurchasedListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetPurchasedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
