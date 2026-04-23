import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, IonicModule, MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from 'src/app/services/student';
import { ActivatedRoute, Route, Router } from '@angular/router';


import { StudentUpdateProfile } from 'src/app/model/student-update.model';
import { Auth } from 'src/app/services/auth';
import { Filesystem } from '@capacitor/filesystem';

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
  dateOfBirth  = '';
  gender = '';
  motherTongue = '';
  fatherName = '';
  motherName = '';

  imageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private alertCtrl: AlertController,
    private studentService: Student,
    private route: ActivatedRoute,
    private router: Router,
     private authService: Auth,
     private menu: MenuController
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

    // ✅ SAFE VALUES (avoid null / undefined)
    this.firstName = data.firstName || '';
    this.middleName = data.middleName || '';
    this.lastName = data.lastName || '';
    this.gender = data.gender || '';
    this.motherTongue = data.motherTongue || '';
    this.fatherName = data.fatherName || '';
    this.motherName = data.motherName || '';

    // ✅ DOB FIX
    if (data.dateOfBirth && /^\d+$/.test(data.dateOfBirth)) {
      const timestamp = Number(data.dateOfBirth) * 1000;
      const date = new Date(timestamp);

      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();

      this.dateOfBirth = `${month}-${day}-${year}`;
    } else {
      this.dateOfBirth = data.dateOfBirth || '';
    }

    this.imagePreview = data.profilePic
      ? res.imageUrl + data.profilePic
      : 'assets/headerprofile.png';

  } catch (err) {
    console.error(err);
    alert('API Failed ❌');
  }
 }
  async openDatePicker() {
    const alert = await this.alertCtrl.create({
      header: 'Select Date',
      inputs: [
        { name: 'dob', type: 'date', value: this.formatForInput(this.dateOfBirth) },
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            if (data.dob) {
              const selected = new Date(data.dob);
              const month = (selected.getMonth() + 1).toString().padStart(2, '0');
              const day = selected.getDate().toString().padStart(2, '0');
              const year = selected.getFullYear();
              this.dateOfBirth = `${month}-${day}-${year}`;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Converts MM-dd-yyyy → yyyy-MM-dd for input type=date
  formatForInput(dateOfBirth: string): string {
    if (!dateOfBirth) return '';
    const parts = dateOfBirth.split('-'); // MM-dd-yyyy
    if (parts.length !== 3) return '';
    return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
  }


async pickImage() {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 70
    });

    if (!photo.path) {
      alert('No file path ❌');
      return;
    }

    const fileData = await Filesystem.readFile({
      path: photo.path
    });

    let base64 = fileData.data as string;

    // 🔥🔥🔥 MAIN FIX
    base64 = base64.replace(/\\/g, ''); // remove \

    // remove prefix if exists
    if (base64.indexOf(',') !== -1) {
      base64 = base64.split(',')[1];
    }

    // convert to blob (safe)
    const blob = await (await fetch(`data:image/jpeg;base64,${base64}`)).blob();

    this.imageFile = new File(
      [blob],
      `profile_${Date.now()}.jpg`,
      { type: 'image/jpeg' }
    );

    this.imagePreview = photo.webPath!;

    console.log('✅ FILE READY:', this.imageFile);

  } catch (err) {
    console.error('❌ Image pick failed', err);
    alert('Image selection failed ❌');
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
  // UPDATE PROFILE (CapacitorHttp)
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

  // 🔥 SAME AS ANDROID
  formData.append('profilePic', this.imageFile);

  try {
    const response = await fetch(
      'https://www.abacustrainer.com/apicalls/Index/updateStudentProfile',
      {
        method: 'POST',
        body: formData
      }
    );

    const resData = await response.json();

    console.log('✅ Upload response:', resData);

    if (resData.status === 'Success') {
      alert('Profile updated successfully!');

      // optional UI update
      this.imagePreview =
        resData.imageUrl +
        resData.result.profilePic +
        '?t=' +
        new Date().getTime();

    } else {
      alert('Upload failed ❌');
    }

  } catch (error) {
    console.error('❌ Upload failed', error);
    alert('Profile update failed.');
  }
}
// ----------------------------
// Build multipart body manually
// ----------------------------
async buildMultipartBody(boundary: string): Promise<string> {
  let body = '';

   
  const fields: { [key: string]: string | File } = {
    studentId: this.studentId,
    firstName: this.firstName,
    middleName: this.middleName || '',
    lastName: this.lastName,
    dateOfBirth:this.dateOfBirth ,
    gender: this.gender,
    motherTongue: this.motherTongue,
    fatherName: this.fatherName || '',
    motherName: this.motherName || '',
    profilePic: this.imageFile!
  };

  for (const key in fields) {
    const value = fields[key];
    if (value instanceof File) {
      const base64Data = await this.fileToBase64(value);
      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="${key}"; filename="${value.name}"\r\n`;
      body += `Content-Type: ${value.type}\r\n\r\n`;
      body += base64Data + '\r\n';
    } else {
      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
      body += value + '\r\n';
    }
  }

  body += `--${boundary}--\r\n`;
  return body;
}

// ----------------------------
// Convert File → Base64
// ----------------------------
fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data URL prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
 async goHome() {
      await this.menu.close();

  this.router.navigate(['/dashboard'], {
    queryParams: {
      tab: 'profile'
    }
  });
}
}