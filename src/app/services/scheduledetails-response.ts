import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduledetailsResponse {
  async getBatchSchedule(studentId: string, batchId: string) {

  const body = new URLSearchParams();
  body.append('studentId', studentId);
  body.append('batchId', batchId);

  try {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getStudentScheduleDates',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    console.log("RAW BATCH RESPONSE:", response);

    let data = response.data;

    // string → JSON
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    // nested JSON
    if (typeof data.data === 'string') {
      data = JSON.parse(data.data);
    }

    console.log("FINAL BATCH DATA:", data);

    return data;

  } catch (error) {
    console.error("Batch Schedule API Error:", error);
    throw error;
  }

}
  
}
