import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { WorksheetListServices } from 'src/app/services/worksheet-list-services';

@Component({
  selector: 'app-worksheet-purchased-list',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './worksheet-purchased-list.page.html',
  styleUrls: ['./worksheet-purchased-list.page.scss'],
})
export class WorksheetPurchasedListPage implements OnInit {
studentId: any;
  levels: any[] = [];
  headerName = "";
  orderId = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.studentId = params['studentId'];
      this.headerName = params['headerName'];
      this.orderId = params['orderId'];

      const levelsData = params['levels'];

      console.log("Received Params:", params);

      if (levelsData) {
        this.levels = JSON.parse(levelsData); // ✅ like Gson parsing
      }

    });

  }

  openLevel(item: any) {

    this.router.navigate(['/worksheet-purchased-list-topic'], {
      queryParams: {
        studentId: this.studentId,
        levelId: item.courseLevelId,
        levelName: item.courseLevel,
        orderId: this.orderId
      }
    });

  }

 async goHome() {
  await this.menu.close();
  this.router.navigate(['/worksheet-list'], {
    queryParams: {
      studentId: this.studentId,
     
    }
  });
}
}