import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkSheetSubscriptionCoursesPageRoutingModule } from './work-sheet-subscription-courses-routing.module';

import { WorkSheetSubscriptionCoursesPage } from './work-sheet-subscription-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkSheetSubscriptionCoursesPageRoutingModule,
    WorkSheetSubscriptionCoursesPage
  ],
 
})
export class WorkSheetSubscriptionCoursesPageModule {}
