import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentViewPracticesResultPageRoutingModule } from './schedules-assignment-view-practices-result-routing.module';

import { SchedulesAssignmentViewPracticesResultPage } from './schedules-assignment-view-practices-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentViewPracticesResultPageRoutingModule,
    SchedulesAssignmentViewPracticesResultPage
  ],
 
  
})
export class SchedulesAssignmentViewPracticesResultPageModule {}
