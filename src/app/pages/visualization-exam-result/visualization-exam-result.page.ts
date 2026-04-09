import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

import { Chart,ChartConfiguration, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const connectorLinePlugin: Plugin<'doughnut'> = {
  id: 'connectorLinePlugin',

  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);

    (meta.data as any[]).forEach((arc, index) => {

      const props = arc.getProps(
        ['x', 'y', 'startAngle', 'endAngle', 'outerRadius'],
        true
      );

      const angle = (props.startAngle + props.endAngle) / 2;

      const x1 = props.x + Math.cos(angle) * props.outerRadius;
      const y1 = props.y + Math.sin(angle) * props.outerRadius;

      const x2 = props.x + Math.cos(angle) * (props.outerRadius + 30);
      const y2 = props.y + Math.sin(angle) * (props.outerRadius + 30);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      const dataset = chart.data.datasets[0];
      const color = (dataset.backgroundColor as string[])[index];

      ctx.strokeStyle = color; // ✅ same as slice
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });
  }
};


// ✅ REGISTER PLUGINS
Chart.register(ChartDataLabels);


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
    layout: {
      padding: 0
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
          display: true,
          color: '#000',
          anchor: 'center',
          align: 'center',

          formatter: (value: any) => {
          const total = this.totalQuestions;
          return total ? Math.round((value / total) * 100) + '%' : '0%';
        },

        font: {
          size: 12,
          weight: 'bold'
        }
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
  return question.replace(/([+\-*])/g, '<br>$1');
  }

}