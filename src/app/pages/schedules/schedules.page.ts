import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { BachDetailsResponse, BatchResult } from 'src/app/model/batchdetail.model';
import { BatchDetailServices } from 'src/app/services/batch-detail-services';

@Component({
  selector: 'app-schedules',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {

  studentId!: string;
  batches: BatchResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private batchService: BatchDetailServices,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.studentId = '2251'; // temporary test
    console.log("StudentId Loaded:", this.studentId);

  this.loadBatches(this.studentId);

    // this.route.queryParams.subscribe(params => {
    //   this.studentId = params['studentId'];
    //   this.loadBatches(this.studentId);
    // });
  }

  async loadBatches(studentId: string) {
    try {
      const res: BachDetailsResponse = await this.batchService.getStudentAllSchedules(studentId);

      if (res.errorCode === '200') {
        this.batches = res.result;
      } else if (res.errorCode === '202') {
        this.showToast('No batches found for this student');
      } else {
        this.showToast('Data Error');
      }
    } catch (error) {
      this.showToast('Network Error');
      console.error(error);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  viewBatchSchedule(batch: BatchResult) {
    console.log("StudentId:", this.studentId);
    console.log("BatchId:", batch.batchId);

    this.router.navigate(['/schedules-details'], {
      queryParams: {
        studentId: this.studentId,
        batchId: batch.batchId,
        batchName: batch.batchName
      }
    });
  }

}
