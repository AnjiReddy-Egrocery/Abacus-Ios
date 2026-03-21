import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { CourseLevelResponse, DurationListResponse } from '../model/course-detail.model';

@Injectable({
  providedIn: 'root',
})
export class WorksheetCourseDetailResponse {
  addLevelToCart(courseLevelId: string, selectedDurationId: string) {
    throw new Error('Method not implemented.');
  }

  async getDurations(): Promise<DurationListResponse> {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getDurationsList',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log("RAW RESPONSE:", response);

    let data = response.data;

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    console.log("PARSED DATA:", data);

    if (typeof data.data === 'string') {
      data = JSON.parse(data.data);
    }

    return data;

  }


  /* ------------------- GET COURSE LEVELS ------------------- */

  async getCourseLevels(courseTypeId: string): Promise<CourseLevelResponse> {

    const body = new URLSearchParams();
    body.append('courseTypeId', courseTypeId);

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getCourseTypeInfo',
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


  async getLevelPrice(courseLevelId: string, durationId: string): Promise<any> {

  const body = new URLSearchParams();
  body.append('courseLevelId', courseLevelId);
  body.append('durationId', durationId);

  const response = await CapacitorHttp.request({
    method: 'POST',
    url: 'https://www.abacustrainer.com/apicalls/Index/getWorksheetCourseLevelPrice',
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