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

interface QuizDataItem {
  question: string;
  correctAnswer: string;
  enterAnswer: string;
  timeTaken: number;
  isCorrect: boolean;
  status: string;
}


@Component({
  selector: 'app-visualization-quiz-exam-result',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,BaseChartDirective],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE

  templateUrl: './visualization-quiz-exam-result.page.html',
  styleUrls: ['./visualization-quiz-exam-result.page.scss'],
})
export class VisualizationQuizExamResultPage implements OnInit {
quizData: QuizDataItem[] = [];
  totalTime = '00:00:00';
  levelValue = 1;

  totalQuestions = 0;
  attemptedCount = 0;
  correctCount = 0;
  wrongCount = 0;

   currentDateTime: string = '';
  headerTitle: string = '';

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

       this.headerTitle = state.headerTitle || ''; // ✅ ADD THIS

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

this.currentDateTime = new Date().toLocaleString();
    }
    
  }

  backToDashboard() { this.router.navigate(['/dashboard']); }

  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(num: number) { return num < 10 ? '0'+num : num.toString(); }

  formatQuestion(q: string) { return q.replace(/([+\-*\/])/g, '<br>$1'); }
}