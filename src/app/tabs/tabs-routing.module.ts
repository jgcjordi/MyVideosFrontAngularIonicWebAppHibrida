import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'videos',
        loadChildren: () => import('../my-videos/my-videos.module').then(m => m.MyVideosPageModule)
      },
      {
        path: 'youtube',
        loadChildren: () => import('../youtube-videos/youtube-videos.module').then(m => m.YoutubeVideosPageModule)
      },
      {
        path: 'playlists',
        loadChildren: () => import('../playlists/playlists.module').then(m => m.PlaylistsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/videos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/videos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
