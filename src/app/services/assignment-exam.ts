import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AllocatedAssignmentExamResponse } from '../model/assignmentexam.model';
import { AllocatedWorksheetAssignmentSubmitResponse } from '../model/assignmentsubmit.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentExam {
   async startAssignmentExam(
    studentId: string,
    topicId: string
  ): Promise<AllocatedAssignmentExamResponse> {
  
    const body = new URLSearchParams();
  
    body.append('studentId', studentId);
    body.append('topicId', topicId);
  
    try {
  
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/startAllocatedAssignmentTopicExam',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body.toString()
      });
  
      console.log("RAW EXAM RESPONSE:", response);
  
      let data: any = response.data;
  
      // string → JSON
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
  
      // nested JSON fix
      if (typeof data.data === 'string') {
        data = JSON.parse(data.data);
      }
  
      console.log("FINAL EXAM DATA:", data);
  
      return data as AllocatedAssignmentExamResponse;
  
    } catch (error) {
  
      console.error("Exam API Error:", error);
      throw error;
  
    }
  }
  
  async submitAllocatedAssignmentExam(
    examRnm: string,
    questionsList: any[]
  ): Promise<AllocatedWorksheetAssignmentSubmitResponse> {
  
    try {
      // Using FormData equivalent for multipart
      const formData = new FormData();
      formData.append('examRnm', examRnm);
      formData.append('questionsList', JSON.stringify(questionsList));
  
      // CapacitorHttp cannot send FormData directly, so we convert to URLSearchParams for simple text data
      const body = new URLSearchParams();
      body.append('examRnm', examRnm);
      body.append('questionsList', JSON.stringify(questionsList));
  
      const response: HttpResponse = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/submitAllocatedAssignmentTopicExam',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body.toString()
      });
  
      console.log("RAW SUBMIT RESPONSE:", response);
  
      let data: any = response.data;
  
      // If API returns string JSON, parse it
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
  
      // Handle nested JSON if needed
      if (typeof data.data === 'string') {
        data = JSON.parse(data.data);
      }
  
      console.log("FINAL SUBMIT DATA:", data);
  
      return data as AllocatedWorksheetAssignmentSubmitResponse;
  
    } catch (error) {
      console.error("Submit Exam API Error:", error);
      throw error;
    }
  }
  }
  
  

