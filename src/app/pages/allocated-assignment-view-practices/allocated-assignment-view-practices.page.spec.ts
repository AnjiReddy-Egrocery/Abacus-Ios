import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedAssignmentViewPracticesPage } from './allocated-assignment-view-practices.page';

describe('AllocatedAssignmentViewPracticesPage', () => {
  let component: AllocatedAssignmentViewPracticesPage;
  let fixture: ComponentFixture<AllocatedAssignmentViewPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedAssignmentViewPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
