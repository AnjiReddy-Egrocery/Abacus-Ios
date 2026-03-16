import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkSheetSubscriptionCoursesDetailsPage } from './work-sheet-subscription-courses-details.page';

describe('WorkSheetSubscriptionCoursesDetailsPage', () => {
  let component: WorkSheetSubscriptionCoursesDetailsPage;
  let fixture: ComponentFixture<WorkSheetSubscriptionCoursesDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSheetSubscriptionCoursesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
