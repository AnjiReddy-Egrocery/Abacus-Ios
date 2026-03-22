import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-profile',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: any = {};
  imageBaseUrl = "https://www.abacustrainer.com/assets/student_images/";

  constructor(private authService: Auth,private router: Router) {}

  async ngOnInit() {
    await this.loadUser();
  }

  async loadUser() {

    const userData: User | null = await this.authService.getUser();

    if(userData){

      this.user.firstName = userData.name;
      this.user.lastName = '';
      this.user.studentId = userData.studentId; 

      this.user.profilePic = userData.image
        ? this.imageBaseUrl + userData.image
        : 'assets/headerprofile.png';

      this.user.level = userData.level || 'Senior Level-1 : Abacus';

      this.user.progress = 75;

      this.user.achievements = [
        'Set Reminder',
        'Mental Math Pro',
        'Addition Master'
      ];

      this.user.recentActivity = [
        { label: 'Completed Quiz', value: 'Abacus Speed Test' },
        { label: 'Played Abacus Race', value: 'Level 3' },
        { label: 'Details', value: 'Join us for a competitive test to showcase your skills!' }
      ];
    }

  }

  editProfile(){
    this.router.navigate(['/update-profile'], {
    queryParams: {
      studentId: this.user.studentId   // 🔴 IMPORTANT
    }
  });
  }
}