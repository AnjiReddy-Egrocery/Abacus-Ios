import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-visualization-exam-result',
   standalone: true,
        imports: [IonicModule, FormsModule, CommonModule, BaseChartDirective],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './visualization-exam-result.page.html',
  styleUrls: ['./visualization-exam-result.page.scss'],
})
export class VisualizationExamResultPage implements OnInit {
questions: string[] = [];
  enteredAnswers: string[] = [];
  originalAnswers: string[] = [];
  questionTimes: number[] = [];
  totalTime: string = '';
 levelValue: number = 1;

  isQuestionAttempted: boolean[] = [];
  isQuestionCorrect: boolean[] = [];

  totalQuestions: number = 0;
  attemptedCount: number = 0;
  correctCount: number = 0;
  wrongCount: number = 0;
  currentDateTime: string = '';

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

    const state: any = history.state.report;

    if (state) {
      this.questions = state.questions || [];
      this.enteredAnswers = state.enteredAnswers || [];
      this.originalAnswers = state.originalAnswers || [];
      this.questionTimes = state.questionTimes || [];
      this.totalTime = state.totalTime || '';
        this.levelValue = Number(state.level) || 1;

      this.isQuestionAttempted = (state.isQuestionAttempted || []).map((v: string) => v === 'true');
      this.isQuestionCorrect = (state.isQuestionCorrect || []).map((v: string) => v === 'true');

      this.totalQuestions = this.questions.length;

      this.attemptedCount = this.isQuestionAttempted.filter(a => a).length;

      this.correctCount = this.isQuestionCorrect.filter((c, i) => 
        this.isQuestionAttempted[i] && c
      ).length;

      this.wrongCount = this.attemptedCount - this.correctCount;

      const notAttempted = this.totalQuestions - this.attemptedCount;

      // ✅ Update pie chart data
     
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

    this.currentDateTime = new Date().toLocaleString();
  }

  // ✅ BUTTONS


  // ✅ NEXT LEVEL
  nextLevel() {
    const next = this.levelValue + 1;
    console.log('Next level:', next);
    this.router.navigate(['/gamelevels', next]);
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // ✅ HELPERS

 formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${this.pad(mins)}:${this.pad(secs)}`;
}

pad(num: number) {
  return num < 10 ? '0' + num : num.toString();
}

  formatQuestion(question: string) {
    return question.replace(/([+-])/g, '<br>$1');
  }

}