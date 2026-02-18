import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth';
import { Login, LoginDataResponse } from 'src/app/services/login';

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

  email: string = '';
  password: string = '';

  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  motherTongue: string = '';
  emailreg: string = '';
  mobile: string = '';


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
      this.showToast(' Please enter email & password');
      return;
    }

    this.loginService.loginUser(this.email, this.password).subscribe({
      next: async (response: LoginDataResponse) => {
        if (response.errorCode === '200') {
            const userData = {
                name: response.result.userFirstName,
                email: response.result.userEmail,
                image: response.result.userImage || 'assets/ic_launcher.png'
              };

              await this.authService.setLoginData(userData);
              this.showToast('✅ Login Successful');
              this.router.navigateByUrl('/dashboard', { replaceUrl: true });
            
        } else {
          this.showToast('❌ Incorrect Email or Password');
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        this.showToast('Login failed. Check internet connection');
      }
    });
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
      if (!this.dob) {
        alert('Select DOB');
        return;
      }
      // 👉 FORMAT DOB
  const formattedDob = new Date(this.dob).toISOString().split('T')[0];

  console.log("Formatted DOB ", formattedDob);

       console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.gender);
        console.log(this.dob);
        console.log(this.motherTongue);
        console.log(this.emailreg);
        console.log(this.mobile);

        if (!this.firstName || !this.lastName || !this.emailreg || !this.mobile ) {
          this.showToast('Please fill all fields');
          return;
        }
     
        // 🔹 Call Registration API
        this.loginService.register(this.firstName, this.lastName, this.gender, formattedDob , this.motherTongue, this.emailreg, this.mobile)
          .subscribe(res => {
            if (res.errorCode === '203') {
              this.showToast('Email or mobile already exists');
            } else if (res.errorCode === '200') {
                 const studentId = res.result.studentId;
                  const otp = res.result.otp;
                  const parentEmail = res.result.parentEmail;

                  // 👉 Navigate to verify page with data
                  this.router.navigate(['/verify'], {
                    queryParams: {
                      studentId: studentId,
                      otp: otp,
                      parentEmail: parentEmail
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
