import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { Chart,ChartConfiguration, ChartType, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ScheduleAssignmentViewTopicResultResponse } from 'src/app/services/schedule-assignment-view-topic-result-response';

interface QuestionItem {
  is_currect: number;
  question: string;      // question HTML/text
  answer: string;        // correct answer
  given?: string;        // student answer
  is_correct?: boolean;  // true if answer is correct
  time_taken?: number;   // seconds spent
  image?: string;        // optional image URL
  status?: number;


}

// API result interface
interface AllocatedResult {
  practiceId: string;
  examRnm: string;
  studentId: string;
  topicId: string;
  topicName: string;
  questionsList: string; // JSON string of QuestionItem[]
  startedOn: string;
  submitedOn: string;
  practiceStatus: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

// API response interface
interface AllocatedResultResponse {
  status: string;
  errorCode?: string;
  message?: string;
  result?: AllocatedResult;
}
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
      ctx.lineWidth = 0.2;
      ctx.stroke();
    });
  }
};


// ✅ REGISTER PLUGINS
// ✅ REGISTER PLUGINS
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-schedules-assignment-view-practices-result',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedules-assignment-view-practices-result.page.html',
  styleUrls: ['./schedules-assignment-view-practices-result.page.scss'],
})
export class SchedulesAssignmentViewPracticesResultPage implements OnInit {
topicName: string = '';
  totalTime: string = '';
  questionData: QuestionItem[] = [];
cufrrentDateTime: string = ''; 
  totalQuestions = 0;
  attemptedCount = 0;
  correctCount = 0;
  wrongCount = 0;

 pieChartType: ChartType = 'doughnut';

 pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Attempted', 'Not Attempted', 'Correct', 'Incorrect'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#f39c12', '#9b59b6', '#27ae60', '#e74c3c'],
      },
    ],
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

  constructor(private resultService: ScheduleAssignmentViewTopicResultResponse,
  private router: Router,
  private menuCtrl: MenuController,
  private route: ActivatedRoute) {}
ngOnInit() {
this.cufrrentDateTime = this.getCurrentDateTime();
  this.route.queryParams.subscribe(params => {

    const examRnm = params['examRnm'];
    this.topicName = params['topicName'];

    console.log("Received examRnm:", examRnm);

    if (!examRnm) return;

    this.loadResult(examRnm);

  });

}
async loadResult(examRnm: any) {

  try {

    const res = await this.resultService.getAllocatedAssignmentResult(examRnm);

    console.log("RESULT API:", res);

    if (res.status === 'Success' && res.result) {

      const result = res.result;

      // 🔹 questionsList parse
     if (result.questionsList) {
          try {
            this.questionData =
              typeof result.questionsList === 'string'
                ? JSON.parse(result.questionsList)
                : result.questionsList;
          } catch (e) {
            console.error("Parse error:", e);
            this.questionData = [];
          }
        }


      console.log("Parsed Questions:", this.questionData);

     let attempted = 0;
        let correct = 0;
        let totalSeconds = 0;

        // ✅ MAIN LOOP (Android logic same)
        this.questionData.forEach(q => {

          totalSeconds += q.time_taken ?? 0;

          if (q.status === 1) {
            attempted++;

            if (q.is_currect === 1) {
              correct++;
              q.is_correct = true;
            } else {
              q.is_correct = false;
            }
          } else {
            q.is_correct = false;
          }
        });

        this.totalQuestions = this.questionData.length;
        this.attemptedCount = attempted;
        this.correctCount = correct;
        this.wrongCount = attempted - correct;

        const notAttempted = this.totalQuestions - attempted;

        // ✅ PIE CHART UPDATE
        this.pieChartData = {
          labels: ['Attempted', 'Not Attempted', 'Correct', 'Incorrect'],
          datasets: [
            {
              data: [
                attempted,
                notAttempted,
                correct,
                this.wrongCount
              ],
              backgroundColor: ['#f39c12', '#9b59b6', '#27ae60', '#e74c3c'],
            },
          ],
        };

        console.log("Attempted:", attempted);
        console.log("Correct:", correct);
        console.log("Wrong:", this.wrongCount);
      }

    } catch (err) {
      console.error("API Error", err);
    }
  }

  // ✅ Android color logic same
  getRowClass(q: any) {
    if (!q.given || q.given === '') {
      return 'not-attempted'; // white
    } else if (q.given === q.answer) {
      return 'correct'; // green
    } else {
      return 'incorrect'; // red
    }
  }

  backToDashboard() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  formatTime(seconds: number | undefined): number {
    return seconds ?? 0;
  }
  getGivenClass(q: any): string {

  if (!q.given || q.given === '') {
    return 'not-attempted';   // white
  }

  if (q.given == q.answer) {
    return 'correct';         // green
  }

  return 'incorrect';         // red
}
getCurrentDateTime(): string {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const formatted = now.toLocaleString('en-US', options);


  return formatted.replace(',', ' |');
}
}