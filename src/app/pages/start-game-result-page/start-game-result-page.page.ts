import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
interface QuizDataItem {
  question: string;
  correctAnswer: string;
  enterAnswer: string;
  timeTaken: number;
  isCorrect: boolean;
  status: string;
}
@Component({
  selector: 'app-start-game-result-page',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,BaseChartDirective],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE

  templateUrl: './start-game-result-page.page.html',
  styleUrls: ['./start-game-result-page.page.scss'],
})
export class StartGameResultPagePage implements OnInit {
quizData: QuizDataItem[] = [];
  totalTime = '00:00:00';
  levelValue = 1;

  totalQuestions = 0;
  attemptedCount = 0;
  correctCount = 0;
  wrongCount = 0;

 pieChartType: 'doughnut' = 'doughnut';

pieChartData: ChartConfiguration<'doughnut'>['data'] = {
  labels: ['Attempted', 'Not Attempted', 'Correct', 'Incorrect'],
  datasets: [
    {
      data: [0, 0, 0, 0],
      backgroundColor: ['#f39c12', '#9b59b6', '#27ae60', '#e74c3c']
    }
  ]
};

pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  plugins: {
    title: { display: false },
    legend: {
       display: false   // ✅ hide square legend
     
    }
  }
};


  constructor(private router: Router, private toastCtrl: ToastController) {}

  ngOnInit() {
    const state: any = history.state;
    if (state && state.quizData) {
      this.quizData = state.quizData.map((q: any) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        enterAnswer: q.enterAnswer || '',
        timeTaken: Number(q.timeTaken) || 0,
        isCorrect: !!q.isCorrect,
        status: q.status || ''
      }));

      this.totalTime = state.totalTime || '00:00:00';
      this.levelValue = Number(state.level) || 1;

      // stats
      this.totalQuestions = this.quizData.length;
      this.attemptedCount = this.quizData.filter(q => q.enterAnswer).length;
      this.correctCount = this.quizData.filter(q => q.enterAnswer && q.isCorrect).length;
      this.wrongCount = this.attemptedCount - this.correctCount;

      const notAttempted = this.totalQuestions - this.attemptedCount;

      // pie chart
     this.pieChartData = {
  labels: ['Attempted', 'Not Attempted', 'Correct', 'Incorrect'],
  datasets: [
    {
      data: [
        this.attemptedCount,
        notAttempted,
        this.correctCount,
        this.wrongCount
      ],
      backgroundColor: ['#f39c12', '#9b59b6', '#27ae60', '#e74c3c']
    }
  ]
};
    }
  }

  backToDashboard() { this.router.navigate(['/dashboard']); }

  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(num: number) { return num < 10 ? '0'+num : num.toString(); }

  formatQuestion(q: string) { return q.replace(/([+-])/g,'<br>$1'); }
}