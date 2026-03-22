import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckOutPagePageRoutingModule } from './check-out-page-routing.module';

import { CheckOutPagePage } from './check-out-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckOutPagePageRoutingModule,
    CheckOutPagePage
  ],
  declarations: []
})
export class CheckOutPagePageModule {}
