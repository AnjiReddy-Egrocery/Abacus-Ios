import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
    private baseUrl = 'https://www.abacustrainer.com/apicalls/Index/';

  constructor() {}

  async addToCart(
  worksheetRnm: string,
  courseTypeId: string,
  courseLevelId: string,
  durationId: string
) {

  const body = new URLSearchParams();
  body.append('worksheetRnm', worksheetRnm);
  body.append('courseTypeId', courseTypeId);
  body.append('courseLevelId', courseLevelId);
  body.append('durationId', durationId);

  console.log('Sending to API:', body.toString());

  try {
    const response = await CapacitorHttp.request({
      method: 'POST',
      url: this.baseUrl + 'worksheetAddToCart',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      data: body.toString()
    });

    console.log('RAW RESPONSE:', response);

    let data: any = response.data;

    if (typeof data === 'string') data = JSON.parse(data);
    if (typeof data.data === 'string') data = JSON.parse(data.data);

    console.log('ADD CART RESPONSE:', data);

    return data;

  } catch (error) {
    console.error('ADD CART ERROR:', error);
    throw error;
  }
}

async getCartList(workSheetRnm: string) {

 

  const body = new URLSearchParams();
  body.set('worksheetRnm', workSheetRnm);

  const response = await CapacitorHttp.request({
    method: 'POST',
    url: this.baseUrl + 'worksheetCartList', // ✅ correct endpoint
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: body.toString()
  });

  console.log("RAW RESPONSE:", response);

  let data: any = response.data;

  // safe parsing (PHP sometimes returns string inside string)
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  }

  if (data?.data && typeof data.data === 'string') {
    try {
      data = JSON.parse(data.data);
    } catch (e) {
      console.error("Nested JSON parse error:", e);
    }
  }

  console.log("CART RESPONSE:", data);

  return data;
}


  async deleteCartItem(cartId: string) {
    const body = new URLSearchParams();
    body.append('cartId', cartId);

    try {
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: this.baseUrl + 'worksheetRemoveFromCart',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString()
      });

      console.log('RAW DELETE RESPONSE:', response);

      let data: any = response.data;
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);

      console.log('FINAL DELETE DATA:', data);
      return data;

    } catch (error) {
      console.error('Delete Cart API Error:', error);
      throw error;
    }
  }

  async checkout(workSheetRnm: string, studentId: string, totalAmount: number) {
    const body = new URLSearchParams();
    body.append('worksheetRnm', workSheetRnm);
    body.append('studentId', studentId);
    body.append('totalAmount', totalAmount.toString());

    try {
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: this.baseUrl + 'submitWorksheetSubscription',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: body.toString()
      });

      console.log('RAW CHECKOUT RESPONSE:', response);

      let data: any = response.data;
      if (typeof data === 'string') data = JSON.parse(data);
      if (typeof data.data === 'string') data = JSON.parse(data.data);

      console.log('FINAL CHECKOUT DATA:', data);
      return data;

    } catch (error) {
      console.error('Checkout API Error:', error);
      throw error;
    }
  }
}