import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { CourseResult, CoursesListResponse } from 'src/app/model/courses-list-response.model';
import { WorksheetCourseResponse } from 'src/app/services/worksheet-course-response';

@Component({
  selector: 'app-work-sheet-subscription-courses',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,  BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './work-sheet-subscription-courses.page.html',
  styleUrls: ['./work-sheet-subscription-courses.page.scss'],
})
export class WorkSheetSubscriptionCoursesPage implements OnInit {
studentId: string = '';
  batchId: string = '';

  courses: CourseResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: WorksheetCourseResponse
  ) {}

  ngOnInit() {

    // receive studentId & batchId
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      this.batchId = params['batchId'];

      console.log('studentId:', this.studentId);
      console.log('batchId:', this.batchId);

      this.loadCourses();
    });

  }

  async loadCourses() {

    try {

      const res: CoursesListResponse =
        await this.coursesService.getCoursesList();

      if (res.errorCode === '200') {

        this.courses = res.result;

      } else {

        console.log('No courses found');

      }

    } catch (error) {

      console.error('Courses Load Error:', error);

    }

  }

  getCourseImage(type: string | undefined): string {

  if (!type) return 'assets/abacus_logo.png';

  const name = type.toLowerCase();

  if (name.includes('junior')) return 'assets/abacusjunior.png';
  if (name.includes('senior')) return 'assets/abacussenior.png';
  if (name.includes('vedic')) return 'assets/vedicmaths.png';

  return 'assets/abacus_logo.png';
}

  getLevelCount(name: string) {

    switch (name?.trim()) {

      case 'Abacus Junior':
        return '(6 Levels)';

      case 'Abacus Senior':
        return '(10 Levels)';

      case 'Vedic Maths':
        return '(4 Levels)';

      default:
        return '(0 Levels)';

    }

  }

  getAgeRange(type: string) {

    switch (type?.toLowerCase().trim()) {

      case 'abacus junior':
        return '(5 - 8 Years)';

      case 'abacus senior':
        return '(8 - 11 Years)';

      case 'vedic maths':
        return '(11 - 14 Years)';

      default:
        return '(5 - 16 Years)';

    }

  }

  subscribe(courseTypeId: string) {

    this.router.navigate(['/work-sheet-subscription-courses-details'], {
      queryParams: {
        courseTypeId: courseTypeId,
        studentId: this.studentId,
        batchId: this.batchId
      }
    });

  }

  goBack() {

    this.router.navigate(['/dashboard'], {
      queryParams: {
        studentId: this.studentId,
        batchId: this.batchId
      }
    });

  }

}
