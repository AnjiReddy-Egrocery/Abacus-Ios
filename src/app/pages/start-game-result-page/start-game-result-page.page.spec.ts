import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartGameResultPagePage } from './start-game-result-page.page';

describe('StartGameResultPagePage', () => {
  let component: StartGameResultPagePage;
  let fixture: ComponentFixture<StartGameResultPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
