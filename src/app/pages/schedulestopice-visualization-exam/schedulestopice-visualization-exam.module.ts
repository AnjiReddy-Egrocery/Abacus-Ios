import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestopiceVisualizationExamPageRoutingModule } from './schedulestopice-visualization-exam-routing.module';

import { SchedulestopiceVisualizationExamPage } from './schedulestopice-visualization-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestopiceVisualizationExamPageRoutingModule,
    SchedulestopiceVisualizationExamPage
  ],
 
})
export class SchedulestopiceVisualizationExamPageModule {}
