import { Injectable } from '@angular/core';
import { AllocatedExamResponse } from '../model/worksheettopimexam.model';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AllocatedWorksheetSubmitResponse } from '../model/worksheettopicresult.model';

@Injectable({
  providedIn: 'root',
})
export class WorksheetPurchasedListToopicExamServices {
   constructor() {}
  
    async getAllocatedTopicPractices(studentId: string, topicId: string): Promise<AllocatedExamResponse> {
      const body = new URLSearchParams();
      body.append('studentId', studentId);
      body.append('topicId', topicId);
  
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/startWorksheetTopicExam',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString()
      });
  
      let data: any = response.data;
  
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);
  
      return data as AllocatedExamResponse;
    }


    async submitAllocatedAssignmentExam(
        examRnm: string,
        questionsList: any[]
      ): Promise<AllocatedWorksheetSubmitResponse> {
      
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
            url: 'https://www.abacustrainer.com/apicalls/Index/submitWorksheetTopicExam',
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
      
          return data as AllocatedWorksheetSubmitResponse;
      
        } catch (error) {
          console.error("Submit Exam API Error:", error);
          throw error;
        }
      }
      }
  
  

