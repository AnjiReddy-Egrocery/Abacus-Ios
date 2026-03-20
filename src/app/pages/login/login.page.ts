import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IonicModule, ToastController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth';
import { Login } from 'src/app/services/login';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storageservices } from 'src/app/services/storageservices';

@Component({
  selector: 'app-login',
    standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
   isSignIn = true;
  showPass = false;
  gender: string = '';
  selectedOption: string = 'B';

  email = '';
  password = '';

  firstName = '';
  lastName = '';
  dob = '';
  motherTongue = '';
  emailreg = '';
  mobile = '';

submitted = false;
genderTouched = false;
emailTouched = false;
mobileTouched = false;
   showPassword: boolean = false;
  
constructor(
     private loginService: Login,
    private router: Router, 
      private authService: Auth,
    private toastCtrl: ToastController,
    private storage: Storageservices,
  private route: ActivatedRoute) {}

  ngOnInit() {
        this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'signin') {
        this.isSignIn = true;
      }
    });

  }

  showSignIn() {
    this.isSignIn = true;
  }

  showSignUp() {
    this.isSignIn = false;
  }


openCalendar() {
  const input = document.getElementById('dob') as HTMLInputElement;
  if (input && input.showPicker) {
    input.showPicker();
  }
}
  togglePass() {
    this.showPass = !this.showPass;
  }
async goToLogin() {
  this.submitted = true;
  if (!this.email || !this.password) return;
  if (!this.isValidEmail(this.email)) return;

  try {
    const response = await this.loginService.loginUser(this.email, this.password);
    console.log("Login API Response:", response);

    if (response.errorCode === '202') {
      this.showToast('Incorrect, please check Email & Password');
      return;
    }

    if (response.errorCode === '200' && response.result) {

      const studentList = response.result || [];
      const imageUrl = response.imageUrl;

      console.log("Student List:", studentList);

      // ✅ Store in Ionic Storage (not localStorage)
     await this.storage.set('student_list', studentList);
    await this.storage.set('image_url', imageUrl);
    await this.storage.set('isLoggedIn', true);

      // Navigate after storage is ready
      if (studentList.length > 1) {
        this.showToast('Multiple Students Found');
        this.router.navigate(['/student-list'], {
          state: { studentList, imageUrl },
          replaceUrl: true
        });
      } else {
        const user = studentList[0];
        const userData = {
          name: user.firstName + ' ' + user.lastName,
          email: user.parentEmail || '',
          image: user.profilePic || 'assets/ic_launcher.png',
          studentId: user.studentId
        };

        await this.authService.setLoginData(userData);

        this.showToast('✅ Login Successful');
        this.router.navigate(['/dashboard'], {
          state: {
            name: userData.name,
            image: userData.image,
            studentId: userData.studentId
          },
          replaceUrl: true
        });
      }

    } else {
      this.showToast(response.message || 'Unexpected server response');
    }

  } catch (err) {
    console.error(err);
    this.showToast('Network or server error');
  }
}




private async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
     
    });
    await toast.present();
  }
  
async registerUser() {

  console.log('Register button clicked');

  this.submitted = true; // 🔥 trigger validation U


  if (!this.firstName) return;
  if (!this.lastName) return;
  if (!this.gender) return;
   
  if (!this.dob) return;
  if (!this.motherTongue) return;
  if (!this.emailreg || !this.isValidEmail(this.emailreg)) return;
  if (!this.mobile || this.mobile.length < 10) return;

  const formattedDob = new Date(this.dob).toISOString().split('T')[0];


  

  try {

    const rawRes = await this.loginService.register(
      this.firstName,
      this.lastName,
      this.gender,
      formattedDob,
      this.motherTongue,
      this.emailreg,
      this.mobile
    );

    console.log('📡 Registration API raw response:', rawRes);

    const res = typeof rawRes === 'string' ? JSON.parse(rawRes) : rawRes;

    console.log('✅ Parsed response:', res);

    // ✅ FIXED SUCCESS CONDITION
    if (
      res.status === "Success" &&
      res.errorCode === "200" &&
      res.result
    ) {

      const { studentId, otp, parentEmail } = res.result;

      console.log('➡️ Navigate to verify:', studentId, otp, parentEmail);

      this.showToast('✅ Registration Successful');

      this.router.navigate(['/verify'], {
        queryParams: { studentId, otp, parentEmail }
      });

    }

    // ❌ Duplicate case
    else if (res?.errorCode === '203') {
      this.showToast(res.errorMessage || 'Email or mobile already exists');
    }

    // ❌ Unknown response
    else {
      console.warn('Unexpected API structure:', res);
      this.showToast(res?.message || 'Unexpected response from server');
    }

  } catch (err) {

    console.error('❌ Registration Error:', err);

    this.showToast('Network error. Check internet / SSL / API');
  }
}

onEmailLoginChange() {
  if (this.submitted) this.submitted = false;
}

onPasswordChange() {
  if (this.submitted) this.submitted = false;
}

onEmailChange() {
  this.emailTouched = true;
}

onMobileChange() {
  this.mobileTouched = true;
}
  
onGenderChange() {
  this.genderTouched = true;
}
     
 
isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

  private isValidMobile(mobile: string) {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(mobile);
  }


togglePassword() {
  this.showPassword = !this.showPassword;
}

goToForgotPassword(){
  this.router.navigate(['/forgot-password']);
}


}
