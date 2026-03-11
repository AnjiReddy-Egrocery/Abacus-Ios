import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentVisualizationExamPageRoutingModule } from './schedules-assignment-visualization-exam-routing.module';

import { SchedulesAssignmentVisualizationExamPage } from './schedules-assignment-visualization-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentVisualizationExamPageRoutingModule,
    SchedulesAssignmentVisualizationExamPage
  ],
 
})
export class SchedulesAssignmentVisualizationExamPageModule {}
