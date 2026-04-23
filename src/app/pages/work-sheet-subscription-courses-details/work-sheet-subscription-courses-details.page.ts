import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { CourseLevel, DurationResult } from 'src/app/model/course-detail.model';
import { CartApiService } from 'src/app/services/cart-api-service';
import { CartMangerSewrvice } from 'src/app/services/cart-manger-sewrvice';
import { WorksheetCourseDetailResponse } from 'src/app/services/worksheet-course-detail-response';

@Component({
  selector: 'app-work-sheet-subscription-courses-details',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule,  BaseChartDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './work-sheet-subscription-courses-details.page.html',
  styleUrls: ['./work-sheet-subscription-courses-details.page.scss'],
})
export class WorkSheetSubscriptionCoursesDetailsPage implements OnInit {
courseTypeId = '';
studentId = '';

  durations: DurationResult[] = [];
  levels: CourseLevel[] = [];

  selectedDurationId: string | null = null;

  totalAmount = 0;
  selectedLevelsCount = 0;
  cartLevels: CourseLevel[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: WorksheetCourseDetailResponse,
    private router: Router,
    private api: CartApiService,
    private cartManager: CartMangerSewrvice,
  private alertController: AlertController
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.courseTypeId = params['courseTypeId'];
      this.studentId = params['studentId']

      console.log('Course Type ID:', this.courseTypeId);
      console.log('Student Type ID:', this.studentId);

      this.loadDurations();
      this.loadLevels();

    });

  }

  async loadDurations() {

    try {

      const res = await this.service.getDurations();

      console.log('Durations API:', res);

      if (res.errorCode === '200') {
        this.durations = res.result;
      }

    } catch (error) {
      console.error('Durations API Error:', error);
    }

  }

  async loadLevels() {

    try {

      const res = await this.service.getCourseLevels(this.courseTypeId);

      console.log('Levels API:', res);

      if (res.errorCode === '200') {

        this.levels = res.result.courseLevels.map((l: any) => ({
          ...l,
          selected: false,
          price: 0
        }));

        this.restoreSelections();

      }

    } catch (error) {
      console.error('Levels API Error:', error);
    }

  }

   restoreSelections() {

    // 🔹 Restore Duration
    const savedDuration = localStorage.getItem(`duration_${this.courseTypeId}`);

    if (savedDuration) {
      this.selectedDurationId = savedDuration;

      // 🔥 reload prices also
      this.selectDuration(savedDuration);
    }

    // 🔹 Restore Levels
    const savedLevels = JSON.parse(
      localStorage.getItem(`levels_${this.courseTypeId}`) || '[]'
    );

    if (savedLevels.length > 0) {
      this.levels.forEach(level => {
        if (savedLevels.includes(level.courseLevelId)) {
          level.selected = true;
        }
      });

      this.calculateTotal();
    }
  }

   goBack() {

    this.router.navigate(['/work-sheet-subscription-courses'], {
      queryParams: {
        studentId: this.studentId,
        coursetypeId: this.courseTypeId
        
      }
    });
  }

async selectDuration(durationId: string) {
  this.selectedDurationId = durationId;

 
localStorage.setItem(`duration_${this.courseTypeId}`, durationId);
  // Fetch prices for all levels in parallel
  await Promise.all(
    this.levels.map(async (level) => {
      try {
        const res = await this.service.getLevelPrice(level.courseLevelId, durationId);
        level.price = res.errorCode === '200' ? Number(res.result.price) : 0;
      } catch (error) {
        console.error('Price API Error', error);
        level.price = 0;
      }
    })
  );

  // Update totals (should be 0 initially)
  this.calculateTotal();
}

toggleLevel(level: CourseLevel) {
  if (!this.selectedDurationId) {
    alert('Please select duration first');
    return;
  }

  // Toggle selection
  level.selected = !level.selected;

  // Recalculate total
  this.calculateTotal();
}

onLevelChange(level: CourseLevel, event: any) {

  // ❌ Duration not selected
  if (!this.selectedDurationId) {

    // 🔁 revert checkbox
    event.target.checked = false;

    // 🔔 show alert (same like Android Toast)
    this.showAlert('Please Select Subscription Duration');

    return;
  }

  // ✅ allow selection
  level.selected = event.detail.checked;

  this.calculateTotal();

   // ✅ SAVE selected levels
  const selectedIds = this.levels
    .filter(l => l.selected)
    .map(l => l.courseLevelId);

  localStorage.setItem(
    `levels_${this.courseTypeId}`,
    JSON.stringify(selectedIds)
  );
}

calculateTotal() {
  this.totalAmount = 0;
  this.selectedLevelsCount = 0;

  this.levels.forEach(level => {
    if (level.selected) {
      this.selectedLevelsCount++;
      this.totalAmount += Number(level.price || 0);
    }
  });

  console.log('Total Amount:', this.totalAmount);
  console.log('Levels Selected:', this.selectedLevelsCount);
}
  async addToCart() {
 if (!this.selectedDurationId) {
    this.showAlert('Please select a duration first');
    return;
  }

  this.cartLevels = this.levels.filter(l => l.selected);

  if (this.cartLevels.length === 0) {
    this.showAlert('Please select level(s) first');
    return;
  }

  const worksheetRnm = this.cartManager.getWorksheetRnm();

  try {
    // 🔥 SAME AS ANDROID LOOP
    for (const level of this.cartLevels) {
      await this.api.addToCart(
        worksheetRnm,
        this.courseTypeId,
        level.courseLevelId,
        this.selectedDurationId
      );
    }

    // ✅ Navigate after success
     this.router.navigate(['/cart-page'], {
      queryParams: {
        worksheetRnm: worksheetRnm,
        studentId: this.studentId
      }
    });

  } catch (err) {
    console.error(err);
    this.showAlert('Failed to add cart');
  }
}
  async viewCart() {
  if (!this.selectedDurationId) {
    this.showAlert('Please select a duration first');
    return;
  }

  this.cartLevels = this.levels.filter(l => l.selected);

  if (this.cartLevels.length === 0) {
    this.showAlert('Please select level(s) first');
    return;
  }

  const worksheetRnm = this.cartManager.getWorksheetRnm();

  try {
    // 🔥 SAME AS ANDROID LOOP
    for (const level of this.cartLevels) {
      await this.api.addToCart(
        worksheetRnm,
        this.courseTypeId,
        level.courseLevelId,
        this.selectedDurationId
      );
    }

    // ✅ Navigate after success
     this.router.navigate(['/cart-page'], {
      queryParams: {
        worksheetRnm: worksheetRnm,
        studentId: this.studentId
      }
    });

  } catch (err) {
    console.error(err);
    this.showAlert('Failed to add cart');
  }
}
async showAlert(msg: string) {
  const alert = await this.alertController.create({
    header: 'Info',
    message: msg,
    buttons: ['OK']
  });
  await alert.present();
}
  
}