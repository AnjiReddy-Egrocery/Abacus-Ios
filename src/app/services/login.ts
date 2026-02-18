import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

export interface LoginDataResponse {
  status: string;
  errorCode: string;
  result: any;
  message: string;
  imageUrl: string;
}

export interface RegisterDataResponce{
   status: string;
  errorCode: string;
  result: any;
  message: string;
  imageUrl: string
}

@Injectable({
  providedIn: 'root',
})
export class Login {

  constructor(private http: HttpClient) {}

  loginUser(loginMobile: string, loginPassword: string): Observable<any> {
  const formData = new FormData();
  formData.append('parentEmail', loginMobile);
  formData.append('password', loginPassword);

  return this.http.post(
      `${environment.apiBaseUrl}/apicalls/Index/studentLogin`,
      formData
    );
}

register(firstName: string, lastName: string, gender: string, dateOfBirth: string, motherTongue: string, email: string, mobile: string): Observable<RegisterDataResponce> {
    const formData = new FormData();
      formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('motherTongue', motherTongue);
    formData.append('emailId', email);
    formData.append('mobileNumber', mobile);

    
    
   

     const url = `${environment.apiBaseUrl}/apicalls/Index/studentRegistration`;
     return this.http.post<RegisterDataResponce>(url, formData);
  }
  
}
