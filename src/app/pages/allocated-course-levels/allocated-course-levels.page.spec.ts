import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedCourseLevelsPage } from './allocated-course-levels.page';

describe('AllocatedCourseLevelsPage', () => {
  let component: AllocatedCourseLevelsPage;
  let fixture: ComponentFixture<AllocatedCourseLevelsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedCourseLevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
