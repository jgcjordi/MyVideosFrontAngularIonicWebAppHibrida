import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Video } from '../models/video';
import { YoutubeVideosService } from '../services/youtube-videos.service';
import { ModalController, ActionSheetController, } from '@ionic/angular';
import { VideoEditorPage } from '../video-editor/video-editor.page';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { OverlayEventDetail } from '@ionic/core';
import { PlaylistsService } from '../services/playlists.service';
import { PlaylistSelectorPage } from '../playlist-selector/playlist-selector.page';




@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.page.html',
  styleUrls: ['./youtube-videos.page.scss'],
})
export class YoutubeVideosPage implements OnInit {
  private query = '';
  private myVideos: Video[] = [];

  constructor(private videos: YoutubeVideosService, private changes: ChangeDetectorRef,
    private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController,
    private playlistService: PlaylistsService) { }

  ngOnInit() {
    console.log('ngOnInit [YoutubeVideosPage]');
    this.searchVideos();
  }

  searchVideos(evt?) {
    console.log('[YoutubeVideosPage] searchVideos()');
    let query = evt ? evt.target.value.trim() : this.query;
    this.videos.findVideos(query)
      .then((videos) => {
        this.myVideos = videos;
        console.log('[YoutubeVideosPage] searchVideos() => ' + JSON.stringify(this.myVideos));
        this.changes.detectChanges();
      });
  }

  showMenu(video) {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Add to playlist',
          icon: 'star',
          handler: () => {
            console.log('Add to playlist!!');
            this.addToPlaylist(video)
          }
        },
        {
          text: 'Play',
          icon: 'play',
          handler: () => {
            console.log('Play video!!');
            this.playVideo(video);
          }
        },
        {
          text: 'Properties',
          icon: 'information-circle',
          handler: () => {
            console.log('Properties!!');
            this.detailsVideo(video);
          },
        }]
    }).then((actionSheet) => actionSheet.present());
  }

  detailsVideo(video: Video) {
    console.log(`[YoutubeVideosPage] detailsVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoEditorPage,
      componentProps: { mode: 'view', video: video }
    })
      .then((modal) => {
        modal.onDidDismiss()
          .then((evt: OverlayEventDetail) => {
            if (evt && evt.data) {
              this.videos.updateVideo(evt.data)
                .then(() => this.searchVideos());
            }
          });
        modal.present();
      });
  }

  playVideo(video: Video) {
    console.log(`[YoutubeVideosPage] playVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: { video: video }
    }).then((modal) => modal.present());
  }

  addToPlaylist(video: Video) {
    console.log(`[YoutubeVideosPage] addToPlaylist(${video.id})`);
    this.modalCtrl.create({
      component: PlaylistSelectorPage,
      componentProps: { video: video }
    }).then((modal) => {
      modal.onDidDismiss()
        .then((evt: OverlayEventDetail) => {
          if (evt && evt.data) {
            this.playlistService.addVideo(evt.data, video)
            console.log(evt.data)
          }
        });
      modal.present();
    });
  }

}
