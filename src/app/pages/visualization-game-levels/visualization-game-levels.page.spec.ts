import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizationGameLevelsPage } from './visualization-game-levels.page';

describe('VisualizationGameLevelsPage', () => {
  let component: VisualizationGameLevelsPage;
  let fixture: ComponentFixture<VisualizationGameLevelsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationGameLevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
