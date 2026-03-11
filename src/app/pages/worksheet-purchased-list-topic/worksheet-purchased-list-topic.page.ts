import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { WorksheetPurchasedListTopicServices } from 'src/app/services/worksheet-purchased-list-topic-services';

@Component({
  selector: 'app-worksheet-purchased-list-topic',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './worksheet-purchased-list-topic.page.html',
  styleUrls: ['./worksheet-purchased-list-topic.page.scss'],
})
export class WorksheetPurchasedListTopicPage implements OnInit {

  studentId:any;
  levelId:any;

  topics:any[] = [];
  emptyMessage='';
constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    private service: WorksheetPurchasedListTopicServices
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params=>{

      this.studentId = params['studentId'];
      this.levelId = params['levelId'];

      console.log("StudentId:",this.studentId);
      console.log("LevelId:",this.levelId);

      this.loadTopics(this.studentId,this.levelId);

    });

  }

async loadTopics(studentId: any, levelId: any){

  try{

   

    const res:any = await this.service.getCourseLevelTopic(studentId,levelId);

    console.log("TOPIC RESPONSE",res);

    if(res.errorCode=="200"){

      if(res.result?.courseLevelTopics?.length>0){

        this.topics = res.result.courseLevelTopics;

      }else{
        this.emptyMessage="No topics found";
      }

    }else{

      this.emptyMessage=res.message;

    }

  }catch(e){

    this.emptyMessage="Server Error";

  }

}

practice(topic:any){

  this.router.navigate(['/worksheet-purchased-list-topic-exam'],{
    queryParams:{
      studentId:this.studentId,
      topicId:topic.topicId,
      topicName:topic.topic
    }
  });

}

viewPractice(topic:any){

  this.router.navigate(['/worksheet-purchased-list-view-practices'],{
    queryParams:{
      studentId:this.studentId,
      topicId:topic.topicId
    }
  });

}

visualization(topic:any){

  this.router.navigate(['/worksheet-purchased-list-visualization-topic-exam'],{
    queryParams:{
      studentId:this.studentId,
      topicId:topic.topicId,
      topicName:topic.topic
    }
  });

}

  async goHome(){
    await this.menu.close();
    this.router.navigate(['/worksheet-purchased-list']);
}

}
