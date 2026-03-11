import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class Scheduletopicresponse {
  async getTopicList(studentId: string, dateId: string) {

    const body = new URLSearchParams();
    body.append('studentId', studentId);
    body.append('dateId', dateId);

    try {

      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/getStudentScheduleTopicsList',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body.toString()
      });

      console.log("RAW TOPIC RESPONSE:", response);

      let data = response.data;

      // string → JSON
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      // nested JSON
      if (typeof data.data === 'string') {
        data = JSON.parse(data.data);
      }

      console.log("FINAL TOPIC DATA:", data);

      return data;

    } catch (error) {

      console.error("Topic List API Error:", error);
      throw error;

    }

  }

}
