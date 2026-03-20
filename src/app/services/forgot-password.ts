import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

export interface ForgotPasswordResponse {
  status: string;
  errorCode: string;
  message: string;
  result: {
    studentId: string;
    parentEmail: string;
    otp: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ForgotPassword {

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {

    const body = new URLSearchParams();
    body.append('userName', email);

    console.log('➡️ Forgot Body:', body.toString());

    try {

      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/studentForgotPassword',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body.toString()
      });

      console.log('➡️ Forgot Response:', response.data);

      return typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;

    } catch (error) {
      console.error('❌ Forgot Error:', error);
      throw error;
    }
  }
  
}
