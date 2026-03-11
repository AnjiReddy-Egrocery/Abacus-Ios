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
studentId:any;
 

  levels:any[]=[];
  emptyMessage="";

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:WorksheetListServices,
     private menu: MenuController,
  ){}

ngOnInit(){

  this.route.queryParams.subscribe(params=>{

    this.studentId = params['studentId'];

    console.log("Received StudentId:",this.studentId);

    this.loadCourses(this.studentId);

  });

}
async loadCourses(studentId:any){

  try{

    const res = await this.service.getCoursesList(studentId);

    console.log("COURSE RESPONSE",res);

    if(res.errorCode=="200"){

      this.levels = res.result.courseLevels;

      console.log("TOTAL LEVELS:",this.levels.length);

    }else{

      this.emptyMessage = res.message;

    }

  }catch(e){

    console.log(e);
    this.emptyMessage="Server error";

  }

}
 async goHome() {
       await this.menu.close();
    this.router.navigate(['/worksheet-list']);
  }

  openLevel(levelId:any){

    this.router.navigate(['/worksheet-purchased-list-topic'],{
      queryParams:{
        studentId:this.studentId,
        levelId:levelId
      }
    });

  }

}
