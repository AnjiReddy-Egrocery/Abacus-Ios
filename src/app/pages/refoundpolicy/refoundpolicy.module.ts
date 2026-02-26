import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefoundpolicyPageRoutingModule } from './refoundpolicy-routing.module';

import { RefoundpolicyPage } from './refoundpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefoundpolicyPageRoutingModule,
    RefoundpolicyPage
  ],
  
})
export class RefoundpolicyPageModule {}
