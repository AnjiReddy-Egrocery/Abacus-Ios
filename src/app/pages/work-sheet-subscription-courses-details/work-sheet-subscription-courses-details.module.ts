import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkSheetSubscriptionCoursesDetailsPageRoutingModule } from './work-sheet-subscription-courses-details-routing.module';

import { WorkSheetSubscriptionCoursesDetailsPage } from './work-sheet-subscription-courses-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkSheetSubscriptionCoursesDetailsPageRoutingModule,
    WorkSheetSubscriptionCoursesDetailsPage
  ],
 
})
export class WorkSheetSubscriptionCoursesDetailsPageModule {}
