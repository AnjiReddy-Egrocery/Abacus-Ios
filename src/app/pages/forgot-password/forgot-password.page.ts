import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ForgotPassword } from 'src/app/services/forgot-password';
import { Verify } from 'src/app/services/verify';

@Component({
  selector: 'app-forgot-password',
   standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  emailreg: string = '';
submitted = false;

constructor(
  private verifyservice: ForgotPassword,
  private router: Router,
  private toastCtrl: ToastController
) {}

async sendForgotPassword() {

  this.submitted = true;

  if (!this.emailreg) return;
  if (!this.isValidEmail(this.emailreg)) return;

  try {

    const res = await this.verifyservice.forgotPassword(this.emailreg);

    if (res.errorCode === '200' && res.result) {

      const { studentId, otp, parentEmail } = res.result;

      this.showToast('OTP Sent Successfully');

      this.router.navigate(['/verify'], {
        queryParams: { studentId, otp, parentEmail }
      });

    } else {
      this.showToast(res.message || 'Failed to send OTP');
    }

  } catch (err) {
    this.showToast('Network error');
  }
}

isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async showToast(msg: string) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'bottom'
  });
  await toast.present();
}

}
