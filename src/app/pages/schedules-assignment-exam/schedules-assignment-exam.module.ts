import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentExamPageRoutingModule } from './schedules-assignment-exam-routing.module';

import { SchedulesAssignmentExamPage } from './schedules-assignment-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentExamPageRoutingModule,
    SchedulesAssignmentExamPage
  ],
})
export class SchedulesAssignmentExamPageModule {}
