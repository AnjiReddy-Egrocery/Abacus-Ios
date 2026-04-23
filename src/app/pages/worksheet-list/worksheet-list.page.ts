import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { WorksheetListServices } from 'src/app/services/worksheet-list-services';

@Component({
  selector: 'app-worksheet-list',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './worksheet-list.page.html',
  styleUrls: ['./worksheet-list.page.scss'],
})
export class WorksheetListPage implements OnInit {

 studentId:any;
  levels:any[] = [];
  emptyMessage="";

  constructor(
    private worksheetService: WorksheetListServices,
    private router: Router,
    private navCtrl: NavController,
    private menu: MenuController,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    
     this.route.queryParams.subscribe(params => {
       console.log("Received Params:", params);
      this.studentId = params['studentId'];
      this.loadOrdersList(this.studentId);
    });
  }
async loadOrdersList(studentId: any) {

  try {

    const res = await this.worksheetService.getCoursesList(studentId);

    console.log("API RESPONSE:", res);

    if (res && res.errorCode === "200") {

      if (res.result && res.result.length > 0) {

        this.levels = res.result;   // ✅ SAME AS ANDROID
        this.emptyMessage = "";

      } else {

        this.levels = [];
        this.emptyMessage = res.emptyAssignmentTopicsessage || "No data available";

      }

    } 
    else if (res && res.errorCode === "202") {

      this.levels = [];
      this.emptyMessage =
        "You do not have any active worksheet subscriptions. Please contact the administrator.";

    } 
    else {

      this.levels = [];
      this.emptyMessage = res?.message || "Something went wrong";

    }

  } 
  catch (error) {

    console.error("Order API Error:", error);
    this.levels = [];
    this.emptyMessage = "Server error. Please try again.";

  }

}

getLevelsText(levels: any[]): string {
  if (!levels || levels.length === 0) return '';
  return levels.map(l => l.courseLevel).join(', ');
}
  openPurchasedPage(item: any) {

  this.navCtrl.navigateForward('/worksheet-purchased-list', {
    queryParams: {
      studentId: this.studentId,
      headerName: item.courseType,
      orderId: item.orderId,
      levels: JSON.stringify(item.courseLevels)
    }
  });

}


   async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }

}


