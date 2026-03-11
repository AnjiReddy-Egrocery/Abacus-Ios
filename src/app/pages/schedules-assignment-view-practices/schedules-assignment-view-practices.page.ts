import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { AllocatedPractice } from 'src/app/model/viewTopic.model';
import { ScheduleAssignmentViewTopicResponse } from 'src/app/services/schedule-assignment-view-topic-response';

@Component({
  selector: 'app-schedules-assignment-view-practices',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,BaseChartDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedules-assignment-view-practices.page.html',
  styleUrls: ['./schedules-assignment-view-practices.page.scss'],
})
export class SchedulesAssignmentViewPracticesPage implements OnInit {
studentId: string='';
  topicId: string = '';
  practices: AllocatedPractice[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: ScheduleAssignmentViewTopicResponse,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      this.topicId = params['topicId'];
      this.loadPractices();
    });
  }

  async loadPractices() {
    try {
      const res = await this.topicService.getAllocatedAssignmentPractices(this.studentId, this.topicId);
      this.loading = false;

      if (res.errorCode === '200' && res.result?.practicesList?.length) {
        this.practices = res.result.practicesList;
      } else if (res.errorCode === '202') {
        this.practices = [];
        const toast = await this.toastCtrl.create({
          message: 'No data found for your request',
          duration: 2000,
          color: 'warning'
        });
        toast.present();
      } else {
        this.practices = [];
        const toast = await this.toastCtrl.create({
          message: 'Data Error',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }

    } catch (err) {
      this.loading = false;
      const toast = await this.toastCtrl.create({
        message: 'Network Error',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error(err);
    }
  }

  openViewResult(practice: AllocatedPractice) {
    this.router.navigate(['/schedules-assignment-view-practices-result'], {
      queryParams: {
        examRnm: practice.examRnm,
        topicName: practice.topicName,
        startedOn: practice.startedOn,
        submitedOn: practice.submitedOn,
        practiceStatus: practice.practiceStatus
      }
    });
  }

  goPreVious() {
    this.navCtrl.back();
  }
}

