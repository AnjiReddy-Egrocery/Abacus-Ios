import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { StudentTotalDetails } from '../model/student.model';
import { StudentUpdateProfile } from '../model/student-update.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Student {
  constructor(private http: HttpClient) {}

 async updateProfile(data: any, imageFile: File) {

  const formData = new FormData();

  formData.append('studentId', data.studentId);
  formData.append('firstName', data.firstName);
  formData.append('middleName', data.middleName || '');
  formData.append('lastName', data.lastName);
  formData.append('dateOfBirth', data.dateOfBirth);
  formData.append('gender', data.gender);
  formData.append('motherTongue', data.motherTongue);
  formData.append('fatherName', data.fatherName || '');
  formData.append('motherName', data.motherName || '');

  // ✅ IMPORTANT FIX
  formData.append('profilePic', imageFile);

  console.log("Uploading with FETCH...");

  const response = await fetch(
    'https://www.abacustrainer.com/apicalls/Index/updateStudentProfile',
    {
      method: 'POST',
      body: formData
    }
  );

  const result = await response.json();

  return result;
}

  async getStudentDetails(studentId: string): Promise<StudentTotalDetails> {

    const body = new URLSearchParams();
    body.append('studentId', studentId);

    const response = await CapacitorHttp.request({
      method: 'POST',
      url: 'https://www.abacustrainer.com/apicalls/Index/getStudentDetails',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    let data = response.data;

    // ✅ Handle string response (same as your service)
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (typeof data.data === 'string') {
      data = JSON.parse(data.data);
    }

    return data;
  }

  

 
}