import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, MenuController, ToastController } from '@ionic/angular';
import { Coursetyperesponse } from 'src/app/services/coursetyperesponse';

@Component({
  selector: 'app-allocatedcourses',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './allocatedcourses.page.html',
  styleUrls: ['./allocatedcourses.page.scss'],
})
export class AllocatedcoursesPage implements OnInit {

 courseTypes:any[] = [];
  studentId:any;
emptyMessage="";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router, private menu: MenuController, private courseService:Coursetyperesponse,
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
       console.log("Received Params:", params);
      this.studentId = params['studentId'];
      this.loadCourses(this.studentId);
    });

  }


   async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }

 async loadCourses(studentId: any){

  try {
  const res:any = await this.courseService.getAllocatedCourses(studentId);

  console.log("COURSE RESPONSE", res);

  if(res.errorCode == "200"){
    this.courseTypes = res.result;
  }
  else if(res.errorCode == "202"){
    //alert(res.errorMessage);
   this.courseTypes = [];  // ensure list is empty
  this.emptyMessage = res.errorMessage || 'No courses found';
   await this.showToast(this.emptyMessage);
  }

  }catch (err) {
    console.error("API ERROR", err);

    this.courseTypes = [];
    await this.showToast('Server error. Please try again.');
  }
}

async showToast(message: string) {
  const toast = await this.toastCtrl.create({
    message: message,
    duration: 2000, // 2 seconds
    position: 'bottom',
    color: 'danger' // optional (red color)
  });

  await toast.present();
}
  openLevel(level:any){

    this.router.navigate(['/course-level'],{
      queryParams:{
        studentId:this.studentId,
        courseLevelId:level.courseLevelId
      }
    })

  }
}