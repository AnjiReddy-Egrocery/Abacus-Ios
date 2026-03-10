import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AllocatedPractice } from 'src/app/model/viewTopic.model';
import { ViewTopicServices } from 'src/app/services/view-topic-services';


@Component({
  selector: 'app-allocated-view-topic-practices',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './allocated-view-topic-practices.page.html',
  styleUrls: ['./allocated-view-topic-practices.page.scss'],
})
export class AllocatedViewTopicPracticesPage implements OnInit {
  studentId: string='';
  topicId: string = '';
  practices: AllocatedPractice[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: ViewTopicServices,
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
      const res = await this.topicService.getAllocatedTopicPractices(this.studentId, this.topicId);
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
    this.router.navigate(['/allocated-view-topic-result-practices'], {
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
