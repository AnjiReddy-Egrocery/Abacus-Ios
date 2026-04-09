import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Storageservices } from '../services/storageservices';

@Component({
  selector: 'app-splash',
   standalone: true,
  imports: [IonicModule],
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage  {

 constructor(
    private router: Router,
     private storage: Storageservices
  ) {}

  async ngOnInit() {
   // await this.storage.create();

    // Wait 3 seconds, then check login
    setTimeout(() => {
      this.checkLogin();
    }, 3000);
  }

  async checkLogin() {

  const isLoggedIn = await this.storage.get('isLoggedIn');
  const studentList = await this.storage.get('student_list') || [];
  const imageUrl = await this.storage.get('image_url') || '';
  const hasSeenWelcome = await this.storage.get('hasSeenWelcome');

  // ✅ FIRST TIME ONLY
  if (!hasSeenWelcome) {
    await this.storage.set('hasSeenWelcome', true);

    this.router.navigate(['/welcome'], { replaceUrl: true });
    return;
  }

  // ✅ Already logged in
  if (isLoggedIn && studentList.length > 0) {

    if (studentList.length > 1) {
      this.router.navigate(['/student-list'], {
        state: { studentList, imageUrl },
        replaceUrl: true
      });
    } else {
      const student = studentList[0];
      this.router.navigate(['/dashboard'], {
        queryParams: { studentId: student.studentId, imageUrl },
        replaceUrl: true
      });
    }

  } else {
    // ✅ NOT LOGGED IN → LOGIN PAGE
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
}