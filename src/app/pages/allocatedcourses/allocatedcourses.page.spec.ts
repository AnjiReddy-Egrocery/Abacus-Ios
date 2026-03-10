import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedcoursesPage } from './allocatedcourses.page';

describe('AllocatedcoursesPage', () => {
  let component: AllocatedcoursesPage;
  let fixture: ComponentFixture<AllocatedcoursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedcoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
