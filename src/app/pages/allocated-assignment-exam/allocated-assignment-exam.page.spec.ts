import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedAssignmentExamPage } from './allocated-assignment-exam.page';

describe('AllocatedAssignmentExamPage', () => {
  let component: AllocatedAssignmentExamPage;
  let fixture: ComponentFixture<AllocatedAssignmentExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedAssignmentExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
