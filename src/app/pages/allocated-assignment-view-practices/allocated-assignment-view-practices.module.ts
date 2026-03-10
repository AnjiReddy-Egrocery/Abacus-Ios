import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedAssignmentViewPracticesPageRoutingModule } from './allocated-assignment-view-practices-routing.module';

import { AllocatedAssignmentViewPracticesPage } from './allocated-assignment-view-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedAssignmentViewPracticesPageRoutingModule,
    AllocatedAssignmentViewPracticesPage
  ],
 
})
export class AllocatedAssignmentViewPracticesPageModule {}
