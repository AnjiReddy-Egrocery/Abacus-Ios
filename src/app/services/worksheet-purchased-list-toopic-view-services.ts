import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { AllocatedViewResponse } from '../model/worksheetviewtopic.model';

@Injectable({
  providedIn: 'root',
})
export class WorksheetPurchasedListToopicViewServices {
  
      constructor() {}
  
    async getAllocatedTopicPractices(studentId: string, topicId: string): Promise<AllocatedViewResponse> {
      const body = new URLSearchParams();
      body.append('studentId', studentId);
      body.append('topicId', topicId);
  
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/getWorksheetTopicPratices',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString()
      });
  
      let data: any = response.data;
  
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);
  
      return data as AllocatedViewResponse;
    }
  
   
}
