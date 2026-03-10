import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { StudentOrdersResponse } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  async getStudentOrders(studentId: string): Promise<StudentOrdersResponse> {

    const body = new URLSearchParams();
    body.append('studentId', studentId);

    try {

      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/getStudentOrdersList',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body.toString()
      });

      console.log("RAW ORDERS RESPONSE:", response);

      let data = response.data;

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      if (typeof data.data === 'string') {
        data = JSON.parse(data.data);
      }

      return data;

    } catch (error) {
      console.error("Orders API Error:", error);
      throw error;
    }
  }

}
