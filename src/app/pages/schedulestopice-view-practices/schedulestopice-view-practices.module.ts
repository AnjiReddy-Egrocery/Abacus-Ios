import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestopiceViewPracticesPageRoutingModule } from './schedulestopice-view-practices-routing.module';

import { SchedulestopiceViewPracticesPage } from './schedulestopice-view-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestopiceViewPracticesPageRoutingModule,
    SchedulestopiceViewPracticesPage
  ],
})
export class SchedulestopiceViewPracticesPageModule {}
