import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizexamPage } from './quizexam.page';

describe('QuizexamPage', () => {
  let component: QuizexamPage;
  let fixture: ComponentFixture<QuizexamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
