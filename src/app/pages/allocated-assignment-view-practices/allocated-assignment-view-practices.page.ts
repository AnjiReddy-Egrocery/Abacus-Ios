import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { AllocatedPractice } from 'src/app/model/viewTopic.model';
import { ViewTopicServices } from 'src/app/services/view-topic-services';

@Component({
  selector: 'app-allocated-assignment-view-practices',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './allocated-assignment-view-practices.page.html',
  styleUrls: ['./allocated-assignment-view-practices.page.scss'],
})
export class AllocatedAssignmentViewPracticesPage implements OnInit {
studentId: string='';
  topicId: string = '';
  practices: AllocatedPractice[] = [];
  loading = true;
  topicName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: ViewTopicServices,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       console.log('PARAMS:', params);
      this.studentId = params['studentId'];
      this.topicId = params['topicId'];

    console.log('studentId:', this.studentId);
    console.log('topicId:', this.topicId);
      this.loadPractices();
    });
  }

  async loadPractices() {
    try {
    const res: any = await this.topicService.getAllocatedAssignmentPractices(this.studentId, this.topicId);

    console.log('FULL RESPONSE 👉', res);

    this.loading = false;

    if (res?.errorCode === '200') {

      const list = res?.result?.practicesList;
       this.topicName = res?.result?.topicName; // ✅ get topicName

      // ✅ Ensure it's actually an array of practices (not questions)
      if (Array.isArray(list) && list.length > 0 && list[0].examRnm) {

         this.practices = list.map((p: any) => ({
          ...p,
          topicName: this.topicName
        })).reverse(); 

        console.log('✅ PRACTICE LIST 👉', this.practices);

      } else {

        console.log('⚠️ INVALID PRACTICE LIST STRUCTURE');
        this.practices = [];

      }

    } else if (res?.errorCode === '202') {

      console.log('⚠️ NO DATA');
      this.practices = [];

    } else {

      console.log('❌ ERROR RESPONSE');
      this.practices = [];

    }

  } catch (err) {

    this.loading = false;
    console.error('🔥 API ERROR 👉', err);
    this.practices = [];

  }

  }

  openViewResult(practice: AllocatedPractice) {
    this.router.navigate(['/allocated-assignment-view-result-practices'], {
      queryParams: {
        examRnm: practice.examRnm,
        topicName: this.topicName,
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

