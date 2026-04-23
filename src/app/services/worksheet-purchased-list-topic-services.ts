import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { CourseLevelTopicResponse } from '../model/course-level-topic.model';

@Injectable({
  providedIn: 'root',
})
export class WorksheetPurchasedListTopicServices {
  async getCourseLevelTopic(studentId: string, courseLevelId: string, orderId: string): Promise<CourseLevelTopicResponse> {

  const body = new URLSearchParams();

  body.append('studentId', studentId);
  body.append('courseLevelId', courseLevelId);
  body.append('orderId', orderId); 

  const response = await CapacitorHttp.request({
    method: 'POST',
    url: 'https://www.abacustrainer.com/apicalls/Index/getStudentWorksheetCourseLevelInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: body.toString()
  });

  let data = response.data;

  // API sometimes returns string
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  if (typeof data.data === 'string') {
    data = JSON.parse(data.data);
  }

  return data;
}
}
