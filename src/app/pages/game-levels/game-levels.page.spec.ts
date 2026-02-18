import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameLevelsPage } from './game-levels.page';

describe('GameLevelsPage', () => {
  let component: GameLevelsPage;
  let fixture: ComponentFixture<GameLevelsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
