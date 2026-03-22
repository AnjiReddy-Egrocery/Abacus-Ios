import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
export interface CourseLevel {
  courseLevelId: string;
  name?: string;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartMangerSewrvice {
   private readonly STORAGE_KEY_RNM = 'worksheet_rnm';
  private readonly STORAGE_KEY_DURATION = 'selected_duration_';
  private readonly STORAGE_KEY_LEVELS = 'selected_levels_';

  constructor(private router: Router) {}

  // Generate or get existing worksheet RNM
  getWorksheetRnm(): string {
    let rnm = localStorage.getItem(this.STORAGE_KEY_RNM);
    if (!rnm) {
      rnm = this.generateSixDigitRnm();
      localStorage.setItem(this.STORAGE_KEY_RNM, rnm);
    }
    return rnm;
  }

  private generateSixDigitRnm(): string {
    return (100000 + Math.floor(Math.random() * 900000)).toString();
  }

  clearCart() {
    localStorage.clear();
  }

  // Save & get selected duration
  saveSelectedDuration(worksheetRnm: string, courseId: string, durationId: string) {
    localStorage.setItem(`${this.STORAGE_KEY_DURATION}${worksheetRnm}_${courseId}`, durationId);
  }

  getSelectedDuration(worksheetRnm: string, courseId: string): string | null {
    return localStorage.getItem(`${this.STORAGE_KEY_DURATION}${worksheetRnm}_${courseId}`);
  }

  // Save & get selected levels
  saveSelectedLevels(worksheetRnm: string, courseId: string, levels: CourseLevel[]) {
    const ids = levels.map(l => l.courseLevelId).join(',');
    localStorage.setItem(`${this.STORAGE_KEY_LEVELS}${worksheetRnm}_${courseId}`, ids);
  }

  getSelectedLevelIds(worksheetRnm: string, courseId: string): string[] {
    const saved = localStorage.getItem(`${this.STORAGE_KEY_LEVELS}${worksheetRnm}_${courseId}`);
    return saved ? saved.split(',').filter(id => id) : [];
  }
}
