import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScheduledetailsResponse } from 'src/app/services/scheduledetails-response';

@Component({
  selector: 'app-schedules-details',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedules-details.page.html',
  styleUrls: ['./schedules-details.page.scss'],
})
export class SchedulesDetailsPage implements OnInit {
studentId = '';
  batchId = '';
  batchName = '';

  startTime = '';
  endTime = '';

  dates: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ScheduledetailsResponse
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      this.batchId = params['batchId'];
      this.batchName = params['batchName'];

      console.log("StudentId Received:", this.studentId);
    console.log("BatchId Received:", this.batchId);

      this.loadBatchSchedule(this.studentId,this.batchId);
    });

  }

  async loadBatchSchedule(studentId: string, batchId: string) {

    this.loading = true;

    try {

      const res = await this.service.getBatchSchedule(
       studentId,batchId
      );

      this.loading = false;

      if (res.errorCode === '200') {

        const result = res.result[0];

        this.startTime = result.startTime;
        this.endTime = result.endTime;

        this.dates = result.dates;

      } else {
        
      }

    } catch (error) {
      this.loading = false;
      console.error('Batch Schedule Error', error);
    }

  }

  viewTopics(d: any) {

    this.router.navigate(['/schedules-topic-list'], {
      queryParams: {
        dateId: d.dateId,
        studentId: this.studentId,
        batchName: this.batchName,
        startTime: this.startTime,
        endTime: this.endTime,
        scheduleDate: d.scheduleDate
      }
    });

  }

  viewAssignments(d: any) {

    this.router.navigate(['/schedules-assignment-list'], {
      queryParams: {
        dateId: d.dateId,
        studentId: this.studentId,
        batchName: this.batchName,
        startTime: this.startTime,
        endTime: this.endTime,
        scheduleDate: d.scheduleDate
      }
    });

  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
