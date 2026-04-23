import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { OrderListResponse } from '../model/order-list.model';
import { CourseListResponse } from '../model/courselist.model';

@Injectable({
  providedIn: 'root',
})
export class WorksheetListServices {

async getCoursesList(studentId: string): Promise<CourseListResponse> {

   const body = new URLSearchParams();
    body.append('studentId', studentId);

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getStudentWorksheetCoursesList',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    let data = response.data;

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (typeof data.data === 'string') {
      data = JSON.parse(data.data);
    }

    return data;

  }
}