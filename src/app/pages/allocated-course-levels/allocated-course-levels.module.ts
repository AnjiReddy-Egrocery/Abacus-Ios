import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedCourseLevelsPageRoutingModule } from './allocated-course-levels-routing.module';

import { AllocatedCourseLevelsPage } from './allocated-course-levels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedCourseLevelsPageRoutingModule,
    AllocatedCourseLevelsPage
  ],

})
export class AllocatedCourseLevelsPageModule {}
