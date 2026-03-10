import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedAssignmentViewResultPracticesPageRoutingModule } from './allocated-assignment-view-result-practices-routing.module';

import { AllocatedAssignmentViewResultPracticesPage } from './allocated-assignment-view-result-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedAssignmentViewResultPracticesPageRoutingModule,
    AllocatedAssignmentViewResultPracticesPage
  ],
 
})
export class AllocatedAssignmentViewResultPracticesPageModule {}
