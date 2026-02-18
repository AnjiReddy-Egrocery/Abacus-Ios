import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

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
export class Verify {
  
  constructor(private http: HttpClient) {}

  verifyOtp(studentId: string, otp: string, password: string): Observable<RegisterDataResponce> {
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('otp', otp);
    formData.append('password', password);
    
     const url = `${environment.apiBaseUrl}/apicalls/Index/verifyStudentAccount`;
     return this.http.post<RegisterDataResponce>(url, formData);
  }
}
