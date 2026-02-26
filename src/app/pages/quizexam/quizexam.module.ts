import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizexamPageRoutingModule } from './quizexam-routing.module';

import { QuizexamPage } from './quizexam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizexamPageRoutingModule,
    QuizexamPage
  ],
  
})
export class QuizexamPageModule {
  
}
