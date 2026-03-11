import { Injectable } from '@angular/core';
import { AllocatedResultResponse } from '../model/viewTopicResult.model';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleTopicViewResultResponse {
  private baseUrl = 'https://www.abacustrainer.com/'; // Replace with your API base
  
    constructor() {}
  
    async getAllocatedResult(examRnm: string): Promise<AllocatedResultResponse> {
      const body = new URLSearchParams();
      body.append('examRnm', examRnm);
  
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: `${this.baseUrl}apicalls/Index/getAllocatedTopicPraticeResult`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString(),
      });
  
      let data: any = response.data;
  
      // Handle string responses
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);
  
      return data as AllocatedResultResponse;
    }
  
     async getAllocatedAssignmentResult(examRnm: string): Promise<AllocatedResultResponse> {
      const body = new URLSearchParams();
      body.append('examRnm', examRnm);
  
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: `${this.baseUrl}apicalls/Index/getScheduleTopicPraticeResult`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString(),
      });
  
      let data: any = response.data;
  
      // Handle string responses
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);
  
      return data as AllocatedResultResponse;
    }
  }
  
  

