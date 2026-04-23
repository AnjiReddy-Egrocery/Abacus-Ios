import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { Coursetyperesponse } from 'src/app/services/coursetyperesponse';

@Component({
  selector: 'app-allocated-course-levels',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './allocated-course-levels.page.html',
  styleUrls: ['./allocated-course-levels.page.scss'],
})
export class AllocatedCourseLevelsPage implements OnInit {

   studentId:string='';
  courseLevelId:string='';

  displayList:any[]=[];
 

// ✅ ADD THIS
noTopicsMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, private menu: MenuController, private courseService:Coursetyperesponse,
  ){}

  ngOnInit(){

    this.route.queryParams.subscribe(params=>{
      
      this.studentId=params['studentId'];
      this.courseLevelId=params['courseLevelId'];

      console.log("StudentId:",this.studentId);
      console.log("CourseLevelId:",this.courseLevelId);

      this.loadTopics();
    })

  }

  async goPreVious() {
    this.router.navigate(['/allocatedcourses'],{
    queryParams:{
      studentId:this.studentId
    }
  });
  }

async loadTopics(){

  // ✅ Reset before API
  this.displayList = [];
  this.noTopicsMessage = '';

  const res = await this.courseService.getCourseTopics(
    this.studentId,
    this.courseLevelId
  );

  console.log("API RESULT:", res);
  console.log("ErrorCode:", res.errorCode);
  console.log("Type:", typeof res.errorCode);

  if (res.errorCode == '200') {

    const levels = res.result;

    levels.forEach((level:any)=>{

      // ❗ Skip if both empty
      if (
        (!level.courseLevelTopics || level.courseLevelTopics.length === 0) &&
        (!level.courseLevelAssignmentTopics || level.courseLevelAssignmentTopics.length === 0)
      ) {
        return;
      }

      // ✅ HEADER
      this.displayList.push({
        type:'HEADER',
        title:'Topic'
      });

      // ✅ TOPICS
      level.courseLevelTopics?.forEach((topic:any)=>{
        this.displayList.push({
          type:'TOPIC',
          title:topic.topic,
          topicId:topic.topicId
        });
      });

      // ✅ ASSIGNMENT HEADER
      if(level.courseLevelAssignmentTopics?.length){

        this.displayList.push({
          type:'ASSIGNMENT_HEADER',
          title:'Assignment Topics'
        });

        level.courseLevelAssignmentTopics.forEach((a:any)=>{
          this.displayList.push({
            type:'ASSIGNMENT_TOPIC',
            title:a.topic,
            topicId:a.topicId
          });
        });

      }

    });

    // ❗ If no data after loop
    if (this.displayList.length === 0) {
      this.noTopicsMessage = "No Topics Available";
    }

  } 
  else if (res.errorCode == '202') {

    // ❌ No courses allocated
    this.displayList = [];
    this.noTopicsMessage = res.errorMessage;

  } 
  else {

    // ⚠️ Other errors
    this.displayList = [];
    this.noTopicsMessage = "Something went wrong";

  }

  // 🔍 Debug
  console.log("Final displayList:", this.displayList);
  console.log("Final message:", this.noTopicsMessage);
}

  openPractice(item:any){

  console.log("Practice Click:", item);

  if(item.type === 'TOPIC'){

    // Android → LevelTopicExamActivity
    this.router.navigate(['/allocated-topic-exam'],{
      queryParams:{
        studentId:this.studentId,
        topicId:item.topicId,
        topicName:item.title
      }
    });

  }

  if(item.type === 'ASSIGNMENT_TOPIC'){

    // Android → LevelAssignmentExamActivity
    this.router.navigate(['/allocated-assignment-exam'],{
      queryParams:{
        studentId:this.studentId,
        topicId:item.topicId,
        topicName:item.title
      }
    });

  }

}

openVisualization(item:any){

  console.log("Visualization Click:", item);

  if(item.type === 'TOPIC'){

    // Android → LevelTopicVisualizationActivity
    this.router.navigate(['/allocated-topic-visualization-exam'],{
      queryParams:{
        studentId:this.studentId,
        topicId:item.topicId,
        topicName:item.title
      }
    });

  }

  if(item.type === 'ASSIGNMENT_TOPIC'){

    // Android → LevelAssignmentVisualizationActivity
    this.router.navigate(['/allocated-assignment-visualization-exam'],{
      queryParams:{
        studentId:this.studentId,
        topicId:item.topicId,
        topicName:item.title
      }
    });

  }

}

openViewPractice(item:any){

  console.log("ViewPractice Click:", item);

  if(item.type === 'TOPIC'){

    // Android → AllocatedViewPracticeActivity
    this.router.navigate(['/allocated-view-topic-practices'],{
      queryParams:{
        studentId:this.studentId,
        topicId:item.topicId
      }
    });

  }

  if(item.type === 'ASSIGNMENT_TOPIC'){

    // Android → AllocatedAssignmentViewPracticeActivity
    this.router.navigate(['/allocated-assignment-view-practices'],{
      queryParams:{
        studentId:this.studentId,
        topicId:item.topicId
      }
    });

  }

}

}

