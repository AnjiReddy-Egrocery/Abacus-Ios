import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentExamResultPageRoutingModule } from './schedules-assignment-exam-result-routing.module';

import { SchedulesAssignmentExamResultPage } from './schedules-assignment-exam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentExamResultPageRoutingModule,
    SchedulesAssignmentExamResultPage
  ],

})
export class SchedulesAssignmentExamResultPageModule {}
