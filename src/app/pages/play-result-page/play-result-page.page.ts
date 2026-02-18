import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-play-result-page',
   standalone: true,
        imports: [IonicModule, FormsModule, CommonModule],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
   
  templateUrl: './play-result-page.page.html',
  styleUrls: ['./play-result-page.page.scss'],
})
export class PlayResultPagePage {
   questions: string[] = [];
  enteredAnswers: string[] = [];
  originalAnswers: string[] = [];
  questionTimes: number[] = [];
  totalTime: string = '';
  levelValue: number = 0;
  isQuestionAttempted: boolean[] = [];
  isQuestionCorrect: boolean[] = [];

  totalQuestions: number = 0;
  attemptedCount: number = 0;
  correctCount: number = 0;
  wrongCount: number = 0;
  currentDateTime: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const state: any = history.state.report;

    if (state) {
      this.questions = state.questions || [];
      this.enteredAnswers = state.enteredAnswers || [];
      this.originalAnswers = state.originalAnswers || [];
      this.questionTimes = state.questionTimes || [];
      this.totalTime = state.totalTime || '';
      this.levelValue = state.level || 1;

      this.isQuestionAttempted = (state.isQuestionAttempted || []).map((v: string) => v === 'true');
      this.isQuestionCorrect = (state.isQuestionCorrect || []).map((v: string) => v === 'true');

      this.totalQuestions = this.questions.length;
      this.attemptedCount = this.isQuestionAttempted.filter(a => a).length;
      this.correctCount = this.isQuestionCorrect.filter((c, i) => this.isQuestionAttempted[i] && c).length;
      this.wrongCount = this.attemptedCount - this.correctCount;

      //setTimeout(() => this.createPieChart(), 500);
    }

    this.currentDateTime = new Date().toLocaleString();
  }

  // Buttons
  retakeTest() {
    this.router.navigate(['/first-level'], { state: { level: this.levelValue } });
  }

  nextLevel() {
    if (this.levelValue < 5) {
      this.router.navigate(['/first-level'], { state: { level: this.levelValue + 1 } });
    } else {
      alert('No further level');
    }
  }

  backToDashboard() {
    this.router.navigate(['/home']);
  }

  formatTime(ms: number) {
    return Math.round(ms / 1000);
  }

 
}
