import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedAssignmentVisualizationExamPageRoutingModule } from './allocated-assignment-visualization-exam-routing.module';

import { AllocatedAssignmentVisualizationExamPage } from './allocated-assignment-visualization-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedAssignmentVisualizationExamPageRoutingModule,
    AllocatedAssignmentVisualizationExamPage
  ],
 
})
export class AllocatedAssignmentVisualizationExamPageModule {}
