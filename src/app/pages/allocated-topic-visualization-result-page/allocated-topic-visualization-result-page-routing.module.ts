import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedTopicVisualizationResultPagePage } from './allocated-topic-visualization-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedTopicVisualizationResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedTopicVisualizationResultPagePageRoutingModule {}
