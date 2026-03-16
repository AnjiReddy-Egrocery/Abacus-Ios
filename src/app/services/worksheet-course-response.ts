import { Injectable } from '@angular/core';
import { CoursesListResponse } from '../model/courses-list-response.model';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class WorksheetCourseResponse {
  private BASE_URL = 'https://www.abacustrainer.com/apicalls/Index/';

  constructor() {}

  async getCoursesList(): Promise<CoursesListResponse> {

    try {

      const response: HttpResponse = await CapacitorHttp.request({
        method: 'POST',
        url: this.BASE_URL + 'getCourseTypesList',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      console.log('RAW COURSES RESPONSE:', response);

      let data: any = response.data;

      // API string JSON fix
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      // nested JSON fix
      if (data.data && typeof data.data === 'string') {
        data = JSON.parse(data.data);
      }

      console.log('FINAL COURSES DATA:', data);

      return data as CoursesListResponse;

    } catch (error) {

      console.error('Courses API Error:', error);
      throw error;

    }

  }
}
