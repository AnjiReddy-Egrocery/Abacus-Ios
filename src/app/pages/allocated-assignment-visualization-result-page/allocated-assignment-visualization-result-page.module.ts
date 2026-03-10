import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedAssignmentVisualizationResultPagePageRoutingModule } from './allocated-assignment-visualization-result-page-routing.module';

import { AllocatedAssignmentVisualizationResultPagePage } from './allocated-assignment-visualization-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedAssignmentVisualizationResultPagePageRoutingModule,
    AllocatedAssignmentVisualizationResultPagePage
  ],
 
})
export class AllocatedAssignmentVisualizationResultPagePageModule {}
