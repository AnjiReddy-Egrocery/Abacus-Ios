import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, IonMenu, MenuController, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { Auth } from 'src/app/services/auth';
import { ProfilePage } from '../profile/profile.page';
import { SchedulesPage } from '../schedules/schedules.page';
import { Preferences } from '@capacitor/preferences';
import { BatchDetailServices } from 'src/app/services/batch-detail-services';
import { BachDetailsResponse } from 'src/app/model/batchdetail.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule, ProfilePage, SchedulesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

   userName: string = '';
studentId: string = '';
userImage: string = 'assets/headerprofile.png';


  selectedStudentId!: string;      // for Schedule component
  batchId: string = '';

 

  
   activeTab: string = 'home'; 
  constructor(private authService: Auth,private menuCtrl: MenuController,private router: Router, 
    private toastController: ToastController, private alertController: AlertController,
  private batchService: BatchDetailServices) {}

  
  async ionViewWillEnter() {
  await this.loadUser();
  this.selectedStudentId = this.studentId; // default value
   this.loadBatchDetails(this.studentId); 
}

  async loadBatchDetails(studentId: string) {

     try {

  const res: BachDetailsResponse = await this.batchService.getStudentAllSchedules(studentId);

  if (res.errorCode === '200' && res.result.length > 0) {

    this.batchId = res.result[0].batchId;   // ✅ only batchId
    console.log("BatchId:", this.batchId);

  } else if (res.errorCode === '202') {

   // this.showToast('No batches found for this student');

  } else {

   // this.showToast('Data Error');

  }

} catch (error) {

 
  console.error(error);

}
  }
  

  async loadUser() {
    const user: User | null = await this.authService.getUser();
  console.log('Loaded user:', user); // Already confirmed works
  if (user) {
    this.userName = user.name;
    this.studentId = user.studentId;
    this.userImage = user.image
      ? 'https://www.abacustrainer.com/assets/student_images/' + user.image
      : 'assets/headerprofile.png';
  }
  }

  

    closeMenu() {
         this.menuCtrl.close('mainMenu'); // pass your menuId

  }

    goToPlaywithNumbers(page: string) {
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/playwithnumbers', { replaceUrl: true });
  }
  gotoAppSetting(){
     this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/appsetting');
  }

   goToAllocatedCourses(){
    this.studentId = "2251"; // ✅ Temporary hardcode ID
      console.log("Using Hardcoded Student ID:", this.studentId);

  this.menuCtrl.close('mainMenu');

  this.router.navigate(['/allocatedcourses'], {
    queryParams: {
      studentId: this.studentId
    }
  });
  }

  goToOrders(){
    this.studentId = "2251"; // ✅ Temporary hardcode ID
      console.log("Using Hardcoded Student ID:", this.studentId);
    this.menuCtrl.close('mainMenu');

  this.router.navigate(['/orders-page'], {
    queryParams: {
      studentId: this.studentId
    }
  });
  }

  goToPrivacyPolicy(){
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/privacypolicy');
  }

  gotoTermsConditions(){
     this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/termsconditions');
  }

  goToHelp(){
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/helpand-supoort');
  }

  ViewMoreDetails(){
     this.studentId = "2251"; // ✅ Temporary hardcode ID
      console.log("Using Hardcoded Student ID:", this.studentId);

  this.menuCtrl.close('mainMenu');

  this.router.navigate(['/worksheet-list'], {
    queryParams: {
      studentId: this.studentId
    }
  });
  }

  ViewMoreBatches(){
     this.activeTab = 'schedules';

  // pass studentId to schedules component
  this.selectedStudentId = this.studentId;
  }
  async openWorksheetSubscription() {

  this.menuCtrl.close();

  const studentId = this.studentId;
  const batchId =this.batchId // your batchId variable

  const { value } = await Preferences.get({ key: 'worksheet_first_time' });

  if (!value) {
    this.showWorksheetDialog(studentId, batchId);
    await Preferences.set({ key: 'worksheet_first_time', value: 'true' });
  } else {

    this.router.navigate(['/work-sheet-subscription-courses'], {
      queryParams: {
        studentId: studentId,
        batchId: batchId
      }
    });

  }
}

async showWorksheetDialog(studentId: string, batchId: string) {

  const alert = await this.alertController.create({
    header: 'Worksheet Subscription',
    message: 'Do you want to continue to Worksheet Subscription?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.activeTab = 'home';
        }
      },
      {
        text: 'Yes',
        handler: () => {

          this.router.navigate(['/work-sheet-subscription-courses'], {
            queryParams: {
              studentId: studentId,
              batchId: batchId
            }
          });

        }
      }
    ]
  });

  await alert.present();
}

  goToSchedules(){
     this.menuCtrl.close(); // Close menu first
      this.activeTab = 'schedules';

  // pass studentId to schedules component
  this.selectedStudentId = this.studentId;
  }

  goToRefoundPolicy(){
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/refoundpolicy');
  }

  goToProgress(){
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/app-progress');
  }

  goToProfile(){
  this.router.navigate(['/profile']);
    }

   goToAboutUs() {
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/about-us');
  }

  logout() {
  // 1️⃣ Clear user session
  localStorage.clear(); // Or your auth service: this.authService.logout();

  // 2️⃣ Close the side menu
  this.menuCtrl.close();

  // 3️⃣ Navigate to login page
  this.router.navigateByUrl('/login', { replaceUrl: true });
}

    gotoDashBoard() {
    // Close the side menu first
    this.menuCtrl.close(); 

    // Set the Home tab as active
    this.activeTab = 'home';

    // Optional: show toast
    this.showAlreadyActive('home');
  }
    async showAlreadyActive(tabName: string) {
    const toast = await this.toastController.create({
      message: `${tabName.toUpperCase()} tab is already active!`,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }
 selectTab(tab: string) {
  this.activeTab = tab;
   if (tab === 'schedule') {
      // Pass logged-in studentId to Schedule tab
      this.selectedStudentId = '2251';
      console.log("Schedule tab using static studentId:", this.selectedStudentId);
    }
}

presentAlreadyActiveMessage(tabName: string) {
  // You can use Ionic Toast or simple alert
  const msg = `${tabName.toUpperCase()} tab is already active!`;
  
  // Option 1: Simple alert
  alert(msg);

  // Option 2: Ionic Toast (better UX)
  /*
  this.toastController.create({
    message: msg,
    duration: 1500,
    position: 'bottom'
  }).then(toast => toast.present());
  */
}
goToSchedule() {
  this.activeTab = 'schedule';
}



}
