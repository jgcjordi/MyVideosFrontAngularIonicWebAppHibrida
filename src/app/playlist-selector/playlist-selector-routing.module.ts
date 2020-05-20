import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistSelectorPage } from './playlist-selector.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistSelectorPageRoutingModule {}
