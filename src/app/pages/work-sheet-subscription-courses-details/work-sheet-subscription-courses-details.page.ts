import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { CourseLevel, DurationResult } from 'src/app/model/course-detail.model';
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

  durations: DurationResult[] = [];
  levels: CourseLevel[] = [];

  selectedDurationId: string | null = null;

  totalAmount = 0;
  selectedLevelsCount = 0;
  cartLevels: CourseLevel[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: WorksheetCourseDetailResponse
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.courseTypeId = params['courseTypeId'];

      console.log('Course Type ID:', this.courseTypeId);

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

      }

    } catch (error) {
      console.error('Levels API Error:', error);
    }

  }

async selectDuration(durationId: string) {
  this.selectedDurationId = durationId;

  // Reset selections whenever duration changes
  this.levels.forEach(level => level.selected = false);

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
addToCart() {
  if (!this.selectedDurationId) {
    alert('Please select a duration first');
    return;
  }

  const levelsToAdd = this.levels.filter(l => l.selected);
  if (levelsToAdd.length === 0) {
    alert('Please select at least one level');
    return;
  }

  // Add to local cart array
  levelsToAdd.forEach(level => {
    if (!this.cartLevels.includes(level)) {
      this.cartLevels.push(level);
    }
  });

  // Update badge count
  this.selectedLevelsCount = this.cartLevels.length;

  
}

  
}