import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkSheetSubscriptionCoursesPage } from './work-sheet-subscription-courses.page';

describe('WorkSheetSubscriptionCoursesPage', () => {
  let component: WorkSheetSubscriptionCoursesPage;
  let fixture: ComponentFixture<WorkSheetSubscriptionCoursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSheetSubscriptionCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
