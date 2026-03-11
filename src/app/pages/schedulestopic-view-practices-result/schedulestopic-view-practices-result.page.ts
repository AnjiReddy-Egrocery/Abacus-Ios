import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScheduleTopicViewResultResponse } from 'src/app/services/schedule-topic-view-result-response';

interface QuestionItem {
  is_currect: number;
  question: string;      // question HTML/text
  answer: string;        // correct answer
  given?: string;        // student answer
  is_correct?: boolean;  // true if answer is correct
  time_taken?: number;   // seconds spent
  image?: string;        // optional image URL
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
      title: { display: false },
      legend: { display: false },
    },
  };

  constructor(private resultService: ScheduleTopicViewResultResponse,
  private router: Router,
    private menuCtrl: MenuController,
  private route: ActivatedRoute) {}
ngOnInit() {

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

    const res = await this.resultService.getAllocatedResult(examRnm);

    console.log("RESULT API:", res);

    if (res.status === 'Success' && res.result) {

      const result = res.result;

      // 🔹 questionsList parse
      if (typeof result.questionsList === 'string') {
        this.questionData = JSON.parse(result.questionsList);
      }

      console.log("Parsed Questions:", this.questionData);

      let attempted = 0;
      let correct = 0;
      let totalSeconds = 0;

      for (const q of this.questionData) {

        totalSeconds += q.time_taken ?? 0;

        if (q.given) {
          attempted++;

          if (q.is_currect == 1) {
            correct++;
          }
        }

      }

      this.totalQuestions = this.questionData.length;
      this.attemptedCount = attempted;
      this.correctCount = correct;
      this.wrongCount = attempted - correct;

      const notAttempted = this.totalQuestions - attempted;

      console.log("Attempted:", attempted);
      console.log("Correct:", correct);
      console.log("Wrong:", this.wrongCount);

    }

  } catch (err) {
    console.error("API Error", err);
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
}