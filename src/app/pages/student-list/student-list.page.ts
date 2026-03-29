import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
studentList: any[] = [];
   imageBaseUrl: string = 'https://www.abacustrainer.com/assets/student_images/';

  // 🔥 Used to refresh image cache
  refreshKey = Date.now();


  constructor(private router: Router, private auth : Auth) {
     // 🔥 VERY IMPORTANT: disable Ionic page cache
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {

   const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state) {
      this.studentList = nav.extras.state['studentList'] || [];
      this.imageBaseUrl = nav.extras.state['imageUrl'] || this.imageBaseUrl;
    }

    console.log("ImageUrl:",this.imageBaseUrl);

    console.log("Student List:", this.studentList);
  }

  // 🔥 Runs every time page opens
  ionViewWillEnter() {
    console.log("Refreshing Images...");

    // change key → forces new image load
    this.refreshKey = Math.random();

    // trigger UI refresh
    this.studentList = [...this.studentList];
  }

  // ✅ Get full image URL with cache buster
  getImage(profilePic: string): string {
    if (!profilePic) {
      return 'assets/abacus_logo.png';
    }

    return `${this.imageBaseUrl}${profilePic}?cache=${this.refreshKey}`;
  }

  // ✅ Handle broken image
  onImageError(event: any) {
    event.target.src = 'assets/abacus_logo.png';
  }

  goToDashboard(student: any) {

    console.log("StudentId:", student.studentId);

   this.auth.setLoginData({
    name: student.firstName + ' ' + student.lastName,
    studentId: student.studentId,
    image: this.imageBaseUrl + student.profilePic
  });
  this.router.navigate(['/dashboard'], { replaceUrl: true })
  }

}
