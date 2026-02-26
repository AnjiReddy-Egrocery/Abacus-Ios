import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsconditionsPage } from './termsconditions.page';

describe('TermsconditionsPage', () => {
  let component: TermsconditionsPage;
  let fixture: ComponentFixture<TermsconditionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsconditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
