import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyVideosPage } from './my-videos.page';

const routes: Routes = [
  {
    path: '',
    component: MyVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyVideosPageRoutingModule {}
