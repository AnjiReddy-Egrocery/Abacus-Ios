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
  imageBaseUrl: string = '';

  constructor(private router: Router, private auth : Auth) {}

  ngOnInit() {

    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state) {
      this.studentList = nav.extras.state['studentList'] || [];
      this.imageBaseUrl = nav.extras.state['imageUrl'] || '';
    }

    console.log("Student List:", this.studentList);
  }

  goToDashboard(student: any) {

    console.log("StudentId:", student.studentId);

   this.auth.setLoginData({
    name: student.firstName + ' ' + student.lastName,
    studentId: student.studentId,
    image: student.profilePic || 'assets/ic_launcher.png'
  });
  this.router.navigate(['/dashboard'], { replaceUrl: true })
  }

}
