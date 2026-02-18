import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaywithNumbersPage } from './playwith-numbers.page';

describe('PlaywithNumbersPage', () => {
  let component: PlaywithNumbersPage;
  let fixture: ComponentFixture<PlaywithNumbersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaywithNumbersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
