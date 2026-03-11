import { Injectable } from '@angular/core';
import { AllocatedTopicResponse } from '../model/viewTopic.model';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleAssignmentViewTopicResponse {
  constructor() {}
  
   
  
    async getAllocatedAssignmentPractices(studentId: string, topicId: string): Promise<AllocatedTopicResponse> {
      const body = new URLSearchParams();
      body.append('studentId', studentId);
      body.append('topicId', topicId);
  
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/getScheduleAssignmentTopicPratices',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString()
      });
  
      let data: any = response.data;
  
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);
  
      return data as AllocatedTopicResponse;
    }
  
}
