import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Verify } from 'src/app/services/verify';

@Component({
  selector: 'app-verify-page',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './verify-page.page.html',
  styleUrls: ['./verify-page.page.scss'],
})
export class VerifyPagePage  {
  Otp: string = '';
  password: string = '';
  confirmpassword: string = '';

  studentId: string = ''; // 👈 will store registerId from query params
   sentOtp: string = '';     // 👈 store OTP from query params

   showPassword: boolean = false;
showConfirmPassword: boolean = false;

submitted = false;

otpTouched = false;
passwordTouched = false;
confirmPasswordTouched = false;

 constructor(private toastCtrl: ToastController,private router: Router,  private alertCtrl: AlertController,
    private verifyservice: Verify,  private modalCtrl: ModalController, private route: ActivatedRoute) {}

    ngOnInit() {
    // 🔹 Read query params sent from registration page
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      this.sentOtp = params['otp'];
     

      console.log('RegisterId:', this.studentId);
      console.log('Received OTP:', this.sentOtp);
      
    });
  }


 async goToVerify() {

  this.submitted = true; // 🔥 trigger validation

  if (!this.Otp) return;
  if (!this.password) return;
  if (!this.confirmpassword) return;

  if (this.password !== this.confirmpassword) return;

  // 👉 OTP match check
   if (this.Otp !== this.sentOtp) return;

  try {

    const res = await this.verifyservice.verifyOtp(
      this.studentId,
      this.Otp,
      this.password
    );

    console.log('✅ Verify response:', res);

    if (res.errorCode === '203') {
      this.showToast('Invalid OTP');
      return;
    }

    if (res.errorCode === '200') {

      const parentEmail = res.result.parentEmail;
      const password = res.result.password;

      this.showToast('Account verified successfully');

      this.router.navigate(['/login'], {
        queryParams: {
          tab: 'signin',
          parentEmail,
          password
        }
      });

    } else {
      this.showToast(res.message || 'Unexpected response from server');
    }

  } catch (err) {
    console.error('❌ Verify error:', err);
    this.showToast('Network error, try again');
  }

}

onOtpChange() {
  this.otpTouched = true;
}

onPasswordChange() {
  this.passwordTouched = true;
}

onConfirmPasswordChange() {
  this.confirmPasswordTouched = true;
}

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}




}
