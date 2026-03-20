import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

export interface LoginResponse {
  status: string;
  errorCode: string;
  message: string;
  result: any;
}

export interface RegisterResponse {
  status: string;
  errorCode: string;
  message: string;
  result: {
    studentId: string;
    otp: string;
    parentEmail: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Login {

private baseUrl = 'https://www.abacustrainer.com';

// ---------------- LOGIN ----------------
async loginUser(email: string, password: string) {

  const body = new URLSearchParams();

  body.append('parentEmail', email);
  body.append('password', password);

  console.log('➡️ Login Body:', body.toString());

  try {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: `${this.baseUrl}/apicalls/Index/loginStudents`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    console.log('➡️ Raw Response:', response.data);

    return typeof response.data === 'string'
      ? JSON.parse(response.data)
      : response.data;

  } catch (error) {
    console.error('❌ Login HTTP Error:', error);
    throw error;
  }
}


  // ---------------- REGISTRATION ----------------
 
async register(
  firstName: string,
  lastName: string,
  gender: string,
  dateOfBirth: string,
  motherTongue: string,
  email: string,
  mobile: string
) {

  const body = new URLSearchParams();

  body.append('firstName', firstName);
  body.append('middleName', '');
  body.append('lastName', lastName);
  body.append('emailId', email);
  body.append('mobileNumber', mobile);
  body.append('gender', gender);
  body.append('motherTongue', motherTongue);
  body.append('dateOfBirth', dateOfBirth);

  console.log('➡️ Register Body:', body.toString());

  try {

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/studentRegistration',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    console.log('➡️ Raw Response:', response.data);

    return typeof response.data === 'string'
      ? JSON.parse(response.data)
      : response.data;

  } catch (error) {
    console.error('❌ HTTP Error:', error);
    throw error;
  }
}

}
