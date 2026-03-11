import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentVisualizationExamResultPageRoutingModule } from './schedules-assignment-visualization-exam-result-routing.module';

import { SchedulesAssignmentVisualizationExamResultPage } from './schedules-assignment-visualization-exam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentVisualizationExamResultPageRoutingModule,
    SchedulesAssignmentVisualizationExamResultPage
  ],
 
})
export class SchedulesAssignmentVisualizationExamResultPageModule {}
