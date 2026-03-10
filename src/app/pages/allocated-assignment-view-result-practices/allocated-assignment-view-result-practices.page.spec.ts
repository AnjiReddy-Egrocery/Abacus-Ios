import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedAssignmentViewResultPracticesPage } from './allocated-assignment-view-result-practices.page';

describe('AllocatedAssignmentViewResultPracticesPage', () => {
  let component: AllocatedAssignmentViewResultPracticesPage;
  let fixture: ComponentFixture<AllocatedAssignmentViewResultPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedAssignmentViewResultPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
