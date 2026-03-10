import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class Coursetyperesponse {
async getAllocatedCourses(studentId: string) {

  const body = new URLSearchParams();
  body.append('studentId', studentId);

  try {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getAllocatedCourseTypesList',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    console.log("RAW RESPONSE:", response);

    let data = response.data;

    // ⚡ if string convert to JSON
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    // ⚡ sometimes API returns nested JSON
    if (typeof data.data === 'string') {
      data = JSON.parse(data.data);
    }

    console.log("FINAL DATA:", data);

    return data;

  } catch (error) {
    console.error("Course API Error:", error);
    throw error;
  }
}

  async getCourseTopics(studentId: string, courseLevelId: string) {

   const body = new URLSearchParams();
  body.append('studentId', studentId);
  body.append('courseLevelId', courseLevelId);

  try {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getAllocatedCourseLevelTopics',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    console.log("RAW RESPONSE:", response);

    let data = response.data;

    // string → JSON
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    // nested JSON
    if (typeof data.data === 'string') {
      data = JSON.parse(data.data);
    }

    console.log("FINAL TOPICS:", data);

    return data;

  } catch (error) {
    console.error("Topics API Error:", error);
    throw error;
  }
}
}