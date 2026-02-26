import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizexamPage } from './quizexam.page';

const routes: Routes = [
  {
    path: '',
    component: QuizexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizexamPageRoutingModule {}
