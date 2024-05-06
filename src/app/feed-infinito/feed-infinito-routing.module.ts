import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedInfinitoPage } from './feed-infinito.page';

const routes: Routes = [
  {
    path: '',
    component: FeedInfinitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedInfinitoPageRoutingModule {}
