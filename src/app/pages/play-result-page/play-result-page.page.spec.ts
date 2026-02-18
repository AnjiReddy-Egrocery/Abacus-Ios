import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayResultPagePage } from './play-result-page.page';

describe('PlayResultPagePage', () => {
  let component: PlayResultPagePage;
  let fixture: ComponentFixture<PlayResultPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
