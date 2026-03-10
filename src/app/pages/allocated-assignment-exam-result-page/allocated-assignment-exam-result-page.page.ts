import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-allocated-assignment-exam-result-page',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,  BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './allocated-assignment-exam-result-page.page.html',
  styleUrls: ['./allocated-assignment-exam-result-page.page.scss'],
})
export class AllocatedAssignmentExamResultPagePage implements OnInit {

 topicName: string = '';
  totalTime: string = '';
  questions: any[] = [];
  answers: string[] = [];
  questionTimes: number[] = [];
  questionData: any[] = [];

  totalQuestions: number = 0;
  attemptedCount: number = 0;
  correctCount: number = 0;
  wrongCount: number = 0;

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
      legend: { display: false }
    }
  };

  constructor(private router: Router, private menu: MenuController) {}

 ngOnInit() {
 const state = history.state;
  if (state?.questionData) {
    this.topicName = state.topicName || '';
    this.totalTime = state.totalTime || '';
    this.questionData = state.questionData;

    this.totalQuestions = this.questionData.length;
    this.attemptedCount = this.questionData.filter(q => q.given).length;
    this.correctCount = this.questionData.filter(q => q.is_correct).length;
    this.wrongCount = this.attemptedCount - this.correctCount;
    const notAttempted = this.totalQuestions - this.attemptedCount;

    this.pieChartData = {
      labels: ['Attempted', 'Not Attempted', 'Correct', 'Incorrect'],
      datasets: [
        {
          data: [this.attemptedCount, notAttempted, this.correctCount, this.wrongCount],
          backgroundColor: ['#f39c12', '#9b59b6', '#27ae60', '#e74c3c']
        }
      ]
    };
  }
}

  async backToDashboard() {
    await this.menu.close();
    this.router.navigate(['/dashboard']);
  }

formatTime(seconds: number) {
  return seconds || 0; // seconds already stored
}
  formatQuestion(q: string) {
    return q.replace(/<br\s*\/?>/gi, '<br>');
  }
}


