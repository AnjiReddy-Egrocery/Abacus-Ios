import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, IonMenu, MenuController, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

   userName: string = '';
studentId: string = '';
userImage: string = 'assets/headerprofile.png';

 

  
   activeTab: string = 'home'; 
  constructor(private authService: Auth,private menuCtrl: MenuController,private router: Router, private toastController: ToastController) {}

  async ngOnInit() {
     await this.loadUser();
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

  goToRefoundPolicy(){
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/refoundpolicy');
  }

  goToProgress(){
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/app-progress');
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
  selectTab(tabName: string) {
  if (this.activeTab === tabName) {
    // User clicked the current tab
    this.presentAlreadyActiveMessage(tabName);
  } else {
    this.activeTab = tabName;
    // Load page content for this tab here
    console.log("Navigating to tab:", tabName);
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
