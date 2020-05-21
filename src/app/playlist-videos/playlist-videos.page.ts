import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Video } from '../models/video';
import { Playlist } from '../models/playlist';
import { VideosService } from '../services/videos.service';
import { YoutubeVideosService } from '../services/youtube-videos.service';
import { PlaylistsService } from '../services/playlists.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { VideoEditorPage } from '../video-editor/video-editor.page';


@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.page.html',
  styleUrls: ['./playlist-videos.page.scss'],
})

export class PlaylistVideosPage implements OnInit {

  private playlistVideos: Video[] = [];

  @Input()
  private playlist: Playlist;

  constructor(private videosService: VideosService, private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController, private playlistService: PlaylistsService,
    private changes: ChangeDetectorRef, private youtubeVideosService: YoutubeVideosService) { }

  ngOnInit() {
    this.searchVideos()
  }

  searchVideos(){
    this.playlistVideos = []
    this.playlist.videosIds.forEach((videoid) => {
      console.log(parseInt(videoid, 10))
      if (Number(videoid)) {
        this.videosService.findVideoById(videoid).then(
          (localVideo) => {
            if (localVideo) {
              this.playlistVideos.push(localVideo)
            } else {
              let video:Video = {
                id: videoid,
                type: "local",
                url: "Deleted", 
                title: "Deleted Video",
                description: "This video was removed form the app"
              }
              this.playlistVideos.push(video)
            }
          })
      } else {
        this.youtubeVideosService.findVideoById(videoid).then(
          video => this.playlistVideos.push(video))
      }
    });
  }

  close() {
    console.log('[PlaylistVideosPage] close()');
    this.modalCtrl.dismiss();
  }

  showMenu(video: Video) {
    this.actionSheetCtrl.create({
      buttons: [
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
            console.log('Show video details!!');
            this.showVideoDetails(video)
          }
        },
        {
          text: 'Remove',
          icon: 'trash',
          handler: () => {
            console.log('Remove video!!');
            this.removeVideo(video);
          }
        }
      ]
    }).then((actionSheet) => actionSheet.present());
  }

  playVideo(video: Video) {
    console.log(`[PlaylistVideosPage] playVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: { video: video }
    }).then((modal) => modal.present());
  }

  showVideoDetails(video: Video) {
    console.log(`[PlaylistVideosPage] showVideoDetails(${video.id})`);
    this.modalCtrl.create({
      component: VideoEditorPage,
      componentProps: { mode: 'view', video: video }
    })
      .then(modal => modal.present()
      );
  }

  removeVideo(video: Video) {
    console.log(`[PlaylistVideosPage] removeVideo(${video.id})`);
    this.playlistService.removeVideo(this.playlist.id, video.id)
    this.searchVideos()
  }

}