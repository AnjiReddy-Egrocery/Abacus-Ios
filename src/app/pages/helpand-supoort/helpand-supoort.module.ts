import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpandSupoortPageRoutingModule } from './helpand-supoort-routing.module';

import { HelpandSupoortPage } from './helpand-supoort.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpandSupoortPageRoutingModule,
    HelpandSupoortPage
  ],
  declarations: []
})
export class HelpandSupoortPageModule {}
