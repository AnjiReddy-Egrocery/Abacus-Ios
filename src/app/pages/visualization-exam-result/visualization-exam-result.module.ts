import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizationExamResultPageRoutingModule } from './visualization-exam-result-routing.module';

import { VisualizationExamResultPage } from './visualization-exam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizationExamResultPageRoutingModule,
    VisualizationExamResultPage
  ],
  declarations: []
})
export class VisualizationExamResultPageModule {}
