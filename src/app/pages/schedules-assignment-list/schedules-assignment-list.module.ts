import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesAssignmentListPageRoutingModule } from './schedules-assignment-list-routing.module';

import { SchedulesAssignmentListPage } from './schedules-assignment-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesAssignmentListPageRoutingModule,
    SchedulesAssignmentListPage
  ],
  
})
export class SchedulesAssignmentListPageModule {}
