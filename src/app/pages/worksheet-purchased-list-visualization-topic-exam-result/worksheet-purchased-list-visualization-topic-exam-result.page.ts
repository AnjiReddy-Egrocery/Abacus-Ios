import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
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
  selector: 'app-worksheet-purchased-list-visualization-topic-exam-result',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,  BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './worksheet-purchased-list-visualization-topic-exam-result.page.html',
  styleUrls: ['./worksheet-purchased-list-visualization-topic-exam-result.page.scss'],
})

export class WorksheetPurchasedListVisualizationTopicExamResultPage implements OnInit {

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


  constructor(private router: Router, private menu: MenuController) {}

 ngOnInit() {
 const state = history.state;
  if (state?.questionData) {
    this.topicName = state.topicName || '';
    this.totalTime = state.totalTime || '';
    this.questionData = state.questionData;

    this.totalQuestions = this.questionData.length;
    this.attemptedCount = this.questionData.filter(q => q.given).length;
      this.correctCount = this.questionData.filter(q =>
      q.given && q.given === q.answer
    ).length;

    this.wrongCount = this.questionData.filter(q =>
      q.given && q.given !== q.answer
    ).length;
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


