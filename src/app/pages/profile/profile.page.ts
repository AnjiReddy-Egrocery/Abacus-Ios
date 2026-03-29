import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { Auth } from 'src/app/services/auth';
import { filter } from 'rxjs/operators';

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

  constructor(private authService: Auth,private router: Router, 
  private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.loadUser();
   this.route.queryParams.subscribe(async (params) => {
      if (params['studentId']) {
        await this.loadUser();
      }
    });

    // 🔥 reload on navigation back
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.loadUser();
      });
  }

  async loadUser() {

    const userData: User | null = await this.authService.getUser();

    if(userData){

      this.user.firstName = userData.name;
      this.user.lastName = '';
      this.user.studentId = userData.studentId; 

    console.log("User Image (raw):", userData.image);

      // 🔥 IMPORTANT FIX (handles both URL + filename)
      if (userData.image) {

        if (userData.image.startsWith('http')) {
          this.user.profilePic = userData.image + '?t=' + Date.now();
        } else {
          this.user.profilePic = this.imageBaseUrl + userData.image + '?t=' + Date.now();
        }

      } else {
        this.user.profilePic = 'assets/headerprofile.png';
      }

      console.log("Final Profile Image:", this.user.profilePic);

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
 onImageError(event: any) {
    event.target.src = 'assets/headerprofile.png';
  }
  editProfile(){
    this.router.navigate(['/update-profile'], {
    queryParams: {
      studentId: this.user.studentId   // 🔴 IMPORTANT
    }
  });
  }
}