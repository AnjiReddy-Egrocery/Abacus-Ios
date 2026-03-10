import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IonicModule, ToastController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth';
import { Login } from 'src/app/services/login';

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


   showPassword: boolean = false;
  
constructor(
     private loginService: Login,
    private router: Router, 
      private authService: Auth,
    private toastCtrl: ToastController,
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
  if (!this.email || !this.password) {
    this.showToast('Please enter email & password');
    return;
  }

  if (!this.isValidEmail(this.email)) {
    this.showToast('Please enter a valid email address');
    return;
  }

  try {
    const response = await this.loginService.loginUser(this.email, this.password);

    console.log("Login API Response:", response);

    if (response.status === 'Success' && response.errorCode === '200') {
      const user = response.result;
        console.log("Student ID from API:", user.studentId);
      const userData = {
        name: user.firstName + ' ' + user.lastName,
        email: user.parentEmail || '',
        image: user.profilePic || 'assets/ic_launcher.png',
        studentId: user.studentId // ✅ include studentId
      };
      console.log("User Data Stored:", userData);

      // Store login info locally (optional)
      await this.authService.setLoginData(userData);

      this.showToast('✅ Login Successful');

      // Pass all user info via router state
      this.router.navigateByUrl('/dashboard', {
        state: {
          name: userData.name,
          image: userData.image,
          studentId: userData.studentId
        }
      });

    } else if (response.errorCode === '202') {
      this.showToast('❌ No user found or wrong credentials');
    } else {
      this.showToast('Unexpected server response');
    }

  } catch (err) {
    this.showToast('Network or server error. Check HTTPS / SSL');
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

  console.log('Form values:', {
    firstName: this.firstName,
    lastName: this.lastName,
    gender: this.gender,
    formattedDob: this.dob,
    motherTongue: this.motherTongue,
    email: this.emailreg,
    mobile: this.mobile,
  });

  // ✅ Validation
  if (!this.firstName || !this.lastName || !this.emailreg || !this.mobile || !this.dob) {
    this.showToast('Please fill all fields');
    return;
  }

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



     
 

  private isValidEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+$/;
    return emailPattern.test(email);
  }

  private isValidMobile(mobile: string) {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(mobile);
  }


togglePassword() {
  this.showPassword = !this.showPassword;
}


}
