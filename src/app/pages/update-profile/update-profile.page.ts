import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from 'src/app/services/student';
import { ActivatedRoute } from '@angular/router';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { StudentUpdateProfile } from 'src/app/model/student-update.model';

@Component({
  selector: 'app-update-profile',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
studentId: any;

  firstName = '';
  middleName = '';
  lastName = '';
  dateOfBirth = '';
  gender = '';
  motherTongue = '';
  fatherName = '';
  motherName = '';

  imageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private alertCtrl: AlertController,
    private studentService: Student,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.studentId = params['studentId'];
      if (!this.studentId) {
        alert('StudentId missing ❌');
        return;
      }
      await this.loadStudentDetails();
    });
  }

  // Load student details like Android
  async loadStudentDetails() {
    try {
      const res = await this.studentService.getStudentDetails(this.studentId);
      const data = res.result;

      this.firstName = data.firstName;
      this.middleName = data.middleName;
      this.lastName = data.lastName;
      this.gender = data.gender;
      this.motherTongue = data.motherTongue;
      this.fatherName = data.fatherName;
      this.motherName = data.motherName;

      if (data.dateOfBirth && /^\d+$/.test(data.dateOfBirth)) {
        this.dateOfBirth = new Date(Number(data.dateOfBirth) * 1000)
          .toISOString()
          .split('T')[0];
      } else {
        this.dateOfBirth = data.dateOfBirth;
      }

      this.imagePreview = res.imageUrl + data.profilePic;
    } catch (err) {
      console.error(err);
      alert('API Failed ❌');
    }
  }

  // Date Picker like Android
  async openDatePicker() {
    const alert = await this.alertCtrl.create({
      header: 'Select Date',
      inputs: [{ name: 'dob', type: 'date', value: this.dateOfBirth }],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            if (data.dob) this.dateOfBirth = data.dob;
          },
        },
      ],
    });
    await alert.present();
  }

  // Camera & Gallery image selection + resizing


async pickImage() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        quality: 70
      });

      if (!photo.base64String) return;

      // Resize the image
      const resizedBase64 = await this.resizeBase64(photo.base64String);

      // Convert to File for FormData
      this.imageFile = this.base64ToFile(resizedBase64, 'profile.jpg');

      // Preview in UI
      this.imagePreview = resizedBase64;

      console.log('✅ Resized image ready:', this.imageFile);
    } catch (err) {
      console.error('❌ Image pick failed', err);
    }
  }

  // -----------------------------
  // RESIZE BASE64 IMAGE
  // -----------------------------
  resizeBase64(base64: string, maxWidth = 800, maxHeight = 800): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', 0.8)); // compress 80%
      };
      img.src = 'data:image/jpeg;base64,' + base64;
    });
  }

  // -----------------------------
  // BASE64 → FILE
  // -----------------------------
  base64ToFile(base64String: string, filename: string): File {
    const byteString = atob(base64String.split(',')[1] || base64String);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], filename, { type: 'image/jpeg' });
  }

  // -----------------------------
  // UPDATE PROFILE
  // -----------------------------
  async updateProfile() {
    if (!this.imageFile) {
      alert('⚠️ Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('studentId', this.studentId);
    formData.append('firstName', this.firstName);
    formData.append('middleName', this.middleName || '');
    formData.append('lastName', this.lastName);
    formData.append('dateOfBirth', this.dateOfBirth);
    formData.append('gender', this.gender);
    formData.append('motherTongue', this.motherTongue);
    formData.append('fatherName', this.fatherName || '');
    formData.append('motherName', this.motherName || '');
    formData.append('profilePic', this.imageFile, this.imageFile.name);

    console.log('✅ Uploading profile for studentId:', this.studentId);

    try {
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://www.abacustrainer.com/apicalls/Index/updateStudentProfile',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      });

      console.log('✅ Upload response:', response);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('❌ Upload failed', error);
      alert('Profile update failed.');
    }
  }
}