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
         if (!this.Otp || !this.password || !this.confirmpassword) {
            this.showToast('Please fill all fields');
            return;
          }

          // 👉 Password match check
          if (this.password !== this.confirmpassword) {
            this.showToast('Password and Confirm Password do not match');
            return;
          }

          // 👉 OTP match check
          if (this.Otp !== this.sentOtp) {
            this.showToast('Invalid OTP');
            return;
          }

       this.verifyservice.verifyOtp(this.studentId, this.Otp, this.password)
          .subscribe(res => {
            if (res.errorCode === '203') {
              this.showToast('Invalid Otp');
            } else if (res.errorCode === '200') {
              
                  const parentEmail = res.result.parentEmail;
                  const password = res.result.password;


                  // 👉 Navigate to verify page with data
                  this.router.navigate(['/login'], {
                    queryParams: {
                         tab: 'signin',

                      parentEmail: parentEmail,
                      password: password
                    }
                  });

            } else {
              this.showToast('Unexpected response from server');
            }
          }, err => {
            console.error(err);
            this.showToast('Network error, try again');
          });
          
            
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
