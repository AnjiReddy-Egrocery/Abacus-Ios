import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {
    firstName: 'Divya',
    lastName: '',
    level: 'Senior Level-1 : Abacus',
    profilePic: 'assets/headerprofile.png',
    progress: 75,
    achievements: ['Set Reminder', 'Mental Math Pro', 'Addition Master'],
    recentActivity: [
      { label: 'Completed Quiz', value: 'Abacus Speed Test' },
      { label: 'Played Abacus Race', value: 'Level 3' },
      { label: 'Details', value: 'Join us for a competitive test to showcase your skills!' }
    ]
  };

  constructor() { }

  ngOnInit() {}

  editProfile() {
    console.log('Edit profile clicked');
    // navigate to edit page or modal
  }
}
