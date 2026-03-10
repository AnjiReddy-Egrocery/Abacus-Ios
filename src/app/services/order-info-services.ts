import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class OrderInfoServices {
  async getOrderInfo(studentId: string, orderId: string) {

  const body = new URLSearchParams();
  body.append('studentId', studentId);
  body.append('orderId', orderId);

  const response = await CapacitorHttp.request({
    method: 'POST',
    url: 'https://www.abacustrainer.com/apicalls/Index/getStudentWorksheetOrderInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: body.toString()
  });

  let data = response.data;

  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  return data;
}
}