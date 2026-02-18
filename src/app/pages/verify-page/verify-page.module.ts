import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPagePageRoutingModule } from './verify-page-routing.module';

import { VerifyPagePage } from './verify-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyPagePageRoutingModule
  ],
  declarations: [VerifyPagePage]
})
export class VerifyPagePageModule {}
