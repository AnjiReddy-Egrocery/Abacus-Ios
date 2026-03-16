import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkSheetSubscriptionCoursesPage } from './work-sheet-subscription-courses.page';

const routes: Routes = [
  {
    path: '',
    component: WorkSheetSubscriptionCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkSheetSubscriptionCoursesPageRoutingModule {}
