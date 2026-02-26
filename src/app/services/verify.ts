import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

export interface VerifyResponse {
  status: string;
  errorCode: string;
  message: string;
  result: {
    parentEmail: string;
    password: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Verify {
  
 async verifyOtp(
  studentId: string,
  otp: string,
  password: string
) {

  const body = new URLSearchParams();

  body.append('studentId', studentId);
  body.append('otp', otp);
  body.append('password', password);

  console.log('➡️ Verify Body:', body.toString());

  try {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/verifyStudentAccount',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    console.log('➡️ Raw Verify Response:', response.data);

    return typeof response.data === 'string'
      ? JSON.parse(response.data)
      : response.data;

  } catch (error) {
    console.error('❌ Verify HTTP Error:', error);
    throw error;
  }
}
}