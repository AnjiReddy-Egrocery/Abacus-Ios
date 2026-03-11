import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { BachDetailsResponse } from '../model/batchdetail.model';

@Injectable({
  providedIn: 'root',
})
export class BatchDetailServices {

  private BASE_URL = 'https://www.abacustrainer.com/apicalls/Index/';

  constructor() {}

  async getStudentAllSchedules(studentId: string): Promise<BachDetailsResponse> {
    try {
      const body = new URLSearchParams();
      // body.append('studentId', studentId);
 body.append('studentId', '2251'); // ✅ static ID
      const response: HttpResponse = await CapacitorHttp.request({
        method: 'POST',
        url: this.BASE_URL + 'getStudentAllSchedules',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: body.toString(),
      });

      console.log('RAW BATCH RESPONSE:', response);

      let data: any = response.data;

      // parse string JSON if API returns as string
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      // handle nested "data" if API sends nested string JSON
      if (data.data && typeof data.data === 'string') {
        data = JSON.parse(data.data);
      }

      console.log('FINAL BATCH DATA:', data);

      return data as BachDetailsResponse;

    } catch (error) {
      console.error('Batch API Error:', error);
      throw error;
    }
  }
}
  

