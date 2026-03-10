import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedcoursesPageRoutingModule } from './allocatedcourses-routing.module';

import { AllocatedcoursesPage } from './allocatedcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedcoursesPageRoutingModule,
    AllocatedcoursesPage
  ],
 
})
export class AllocatedcoursesPageModule {}
