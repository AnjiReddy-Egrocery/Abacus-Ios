import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Scheduletopicresponse } from 'src/app/services/scheduletopicresponse';

@Component({
  selector: 'app-schedules-topic-list',
     standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedules-topic-list.page.html',
  styleUrls: ['./schedules-topic-list.page.scss'],
})
export class SchedulesTopicListPage implements OnInit {

  studentId: string = '';
  dateId: string = '';
  batchName: string = '';
  scheduleDate: string = '';

  headerText: string = '';

  topics: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: Scheduletopicresponse
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.studentId = params['studentId'];
      this.dateId = params['dateId'];
      this.batchName = params['batchName'];
      this.scheduleDate = params['scheduleDate'];

      this.headerText = this.batchName + ' || ' + this.scheduleDate;

      this.loadTopics();
    });

  }

  async loadTopics() {

    this.loading = true;

    try {

      const res = await this.topicService.getTopicList(
        this.studentId,
        this.dateId
      );

      if (res.errorCode === '200') {

        this.topics = res.result.topicsList;

      } else {

       

      }

    } catch (error) {

      console.log('Topic API error', error);

    }

    this.loading = false;

  }

  backToBatch() {
     this.router.navigate(['/schedules-details'], {
    queryParams: {
      studentId: this.studentId,
      batchName: this.batchName,
      scheduleDate: this.scheduleDate,
      dateId: this.dateId
    }
  });
  }

  practiceNow(topic: any) {

    this.router.navigate(['/schedulestopicexam'], {
      queryParams: {
        topicId: topic.topicId,
        studentId: this.studentId,
        topicName: topic.topicName
      }
    });

  }

  //  visualization(topic: any) {

  //   this.router.navigate(['/schedulestopice-visualization-exam'], {
  //     queryParams: {
  //       topicId: topic.topicId,
  //       studentId: this.studentId,
  //       topicName: topic.topicName
  //     }
  //   });

  // }

  viewPractices(topic: any) {

    if (topic.practicesCount > 0) {

      this.router.navigate(['/schedulestopice-view-practices'], {
        queryParams: {
          topicId: topic.topicId,
          studentId: this.studentId,
          topicName: topic.topicName
        }
      });

    } else {

      this.router.navigate(['/no-data']);

    }

  }

}
