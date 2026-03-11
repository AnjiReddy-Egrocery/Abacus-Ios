import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentViewPracticesPageRoutingModule } from './schedules-assignment-view-practices-routing.module';

import { SchedulesAssignmentViewPracticesPage } from './schedules-assignment-view-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentViewPracticesPageRoutingModule,
    SchedulesAssignmentViewPracticesPage
  ],
  
})
export class SchedulesAssignmentViewPracticesPageModule {}
