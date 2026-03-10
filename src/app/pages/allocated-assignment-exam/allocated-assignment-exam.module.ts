import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedAssignmentExamPageRoutingModule } from './allocated-assignment-exam-routing.module';

import { AllocatedAssignmentExamPage } from './allocated-assignment-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedAssignmentExamPageRoutingModule,
    AllocatedAssignmentExamPage
  ],
 
})
export class AllocatedAssignmentExamPageModule {}
