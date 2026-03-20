import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizationQuizExamResultPageRoutingModule } from './visualization-quiz-exam-result-routing.module';

import { VisualizationQuizExamResultPage } from './visualization-quiz-exam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizationQuizExamResultPageRoutingModule,
    VisualizationQuizExamResultPage
  ],
  declarations: []
})
export class VisualizationQuizExamResultPageModule {}
