import { Injectable } from '@angular/core';

import { CapacitorHttp } from '@capacitor/core';
import { AllocatedTopicResponse } from '../model/viewTopic.model';


@Injectable({
  providedIn: 'root',
})
export class ViewTopicServices {

    constructor() {}

  async getAllocatedTopicPractices(studentId: string, topicId: string): Promise<AllocatedTopicResponse> {
    const body = new URLSearchParams();
    body.append('studentId', studentId);
    body.append('topicId', topicId);

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getAllocatedTopicPratices',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: body.toString()
    });

    let data: any = response.data;

    if (typeof data === 'string') data = JSON.parse(data);
    if (typeof data.data === 'string') data = JSON.parse(data.data);

    return data as AllocatedTopicResponse;
  }

  async getAllocatedAssignmentPractices(studentId: string, topicId: string): Promise<AllocatedTopicResponse> {
    const body = new URLSearchParams();
    body.append('studentId', studentId);
    body.append('topicId', topicId);

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getAllocatedAssignmentTopicPratices',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: body.toString()
    });

     console.log('FULL RESPONSE:', response);

    let data: any = response.data;

     console.log('RAW DATA:', data);

     try {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    console.log('PARSED DATA:', data);

    if (typeof data.data === 'string') {
      data.data = JSON.parse(data.data);
    }

    console.log('FINAL DATA:', data);

  } catch (e) {
    console.error('JSON PARSE ERROR:', e);
  }

  return data;
  }
}