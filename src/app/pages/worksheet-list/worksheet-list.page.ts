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

    const res = await this.worksheetService.getWorkSheet(studentId);

    console.log("API RESPONSE:", res);

    if (res && res.errorCode === "200") {

      if (res.result && res.result.courseTypes && res.result.courseTypes.length > 0) {

        this.levels = res.result.courseTypes;
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
  openPurchasedPage(){

    this.navCtrl.navigateForward('/worksheet-purchased-list',{
      queryParams:
      { 
        studentId:this.studentId 
      }
    });

  }


   async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }

}


