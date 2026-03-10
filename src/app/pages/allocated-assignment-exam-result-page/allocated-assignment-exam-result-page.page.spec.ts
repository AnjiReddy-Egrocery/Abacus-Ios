import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedAssignmentExamResultPagePage } from './allocated-assignment-exam-result-page.page';

describe('AllocatedAssignmentExamResultPagePage', () => {
  let component: AllocatedAssignmentExamResultPagePage;
  let fixture: ComponentFixture<AllocatedAssignmentExamResultPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedAssignmentExamResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
