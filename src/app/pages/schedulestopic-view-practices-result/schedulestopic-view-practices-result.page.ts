import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScheduleTopicViewResultResponse } from 'src/app/services/schedule-topic-view-result-response';

interface QuestionItem {
  question: string;
  answer: string;
  given?: string;
  is_currect: number;
  time_taken?: number;
  status?: number;

  // UI purpose
  is_correct?: boolean;
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


@Component({
  selector: 'app-schedulestopic-view-practices-result',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedulestopic-view-practices-result.page.html',
  styleUrls: ['./schedulestopic-view-practices-result.page.scss'],
})
export class SchedulestopicViewPracticesResultPage implements OnInit {
topicName: string = '';
  totalTime: string = '';
  questionData: QuestionItem[] = [];

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
    plugins: {
      legend: { display: false },
    },
  };

  constructor(
    private resultService: ScheduleTopicViewResultResponse,
    private router: Router,
    private menuCtrl: MenuController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const examRnm = params['examRnm'];
      this.topicName = params['topicName'];

      if (examRnm) {
        this.loadResult(examRnm);
      }
    });
  }

  async loadResult(examRnm: any) {
    
    try {
      const res: any = await this.resultService.getAllocatedResult(examRnm);

      console.log("RESULT API:", res);

      if (res.status === 'Success' && res.result) {

        const result = res.result;

        // ✅ FIX 1: handle string OR array
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
}