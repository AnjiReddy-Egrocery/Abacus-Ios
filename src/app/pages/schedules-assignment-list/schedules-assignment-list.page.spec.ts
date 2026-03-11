import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesAssignmentListPage } from './schedules-assignment-list.page';

describe('SchedulesAssignmentListPage', () => {
  let component: SchedulesAssignmentListPage;
  let fixture: ComponentFixture<SchedulesAssignmentListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAssignmentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
