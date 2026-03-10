import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedAssignmentExamResultPagePageRoutingModule } from './allocated-assignment-exam-result-page-routing.module';

import { AllocatedAssignmentExamResultPagePage } from './allocated-assignment-exam-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedAssignmentExamResultPagePageRoutingModule,
    AllocatedAssignmentExamResultPagePage
  ],
 
})
export class AllocatedAssignmentExamResultPagePageModule {}
