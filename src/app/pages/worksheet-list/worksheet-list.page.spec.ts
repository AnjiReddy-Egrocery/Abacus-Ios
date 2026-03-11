import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetListPage } from './worksheet-list.page';

describe('WorksheetListPage', () => {
  let component: WorksheetListPage;
  let fixture: ComponentFixture<WorksheetListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
