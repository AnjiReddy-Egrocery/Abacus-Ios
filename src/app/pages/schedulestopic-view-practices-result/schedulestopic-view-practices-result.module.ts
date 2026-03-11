import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestopicViewPracticesResultPageRoutingModule } from './schedulestopic-view-practices-result-routing.module';

import { SchedulestopicViewPracticesResultPage } from './schedulestopic-view-practices-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestopicViewPracticesResultPageRoutingModule,
    SchedulestopicViewPracticesResultPage
  ],
 
})
export class SchedulestopicViewPracticesResultPageModule {}
