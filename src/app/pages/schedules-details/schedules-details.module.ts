import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesDetailsPageRoutingModule } from './schedules-details-routing.module';

import { SchedulesDetailsPage } from './schedules-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesDetailsPageRoutingModule,
    SchedulesDetailsPage
  ],
 
})
export class SchedulesDetailsPageModule {}
