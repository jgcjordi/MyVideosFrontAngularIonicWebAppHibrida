import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'my-videos',
    loadChildren: () => import('./my-videos/my-videos.module').then( m => m.MyVideosPageModule)
  },
  {
    path: 'youtube-videos',
    loadChildren: () => import('./youtube-videos/youtube-videos.module').then( m => m.YoutubeVideosPageModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./playlists/playlists.module').then( m => m.PlaylistsPageModule)
  },  {
    path: 'video-editor',
    loadChildren: () => import('./video-editor/video-editor.module').then( m => m.VideoEditorPageModule)
  },
  {
    path: 'video-player',
    loadChildren: () => import('./video-player/video-player.module').then( m => m.VideoPlayerPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
