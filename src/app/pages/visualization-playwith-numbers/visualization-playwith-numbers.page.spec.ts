import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizationPlaywithNumbersPage } from './visualization-playwith-numbers.page';

describe('VisualizationPlaywithNumbersPage', () => {
  let component: VisualizationPlaywithNumbersPage;
  let fixture: ComponentFixture<VisualizationPlaywithNumbersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationPlaywithNumbersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
