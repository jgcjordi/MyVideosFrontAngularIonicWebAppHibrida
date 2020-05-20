import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Video } from '../models/video';
import { VideosService } from '../services/videos.service';
import { PlaylistsService } from '../services/playlists.service';
import { AlertController, ModalController, ActionSheetController, } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { VideoEditorPage } from '../video-editor/video-editor.page';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { PlaylistSelectorPage } from '../playlist-selector/playlist-selector.page';
import { OverlayEventDetail } from '@ionic/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.page.html',
  styleUrls: ['./my-videos.page.scss'],
})
export class MyVideosPage implements OnInit {
  private query = '';
  private myVideos: Video[] = [];

  constructor(private modalCtrl: ModalController, private camera: Camera,
    private videos: VideosService, private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController, private changes: ChangeDetectorRef,
    private playlistService: PlaylistsService) { }

  ngOnInit() {
    console.log('ngOnInit MyVideosPage');
    this.readVideoInfo("/assets/video/video1.mp4").then((video) => {
      video.title = "Keep spirit"
      video.description = "We will have our reward"
      this.videos.addVideo(video)

      this.readVideoInfo("/assets/video/video2.mp4").then((video2) => {
        video2.title = "Keep spirit"
        video2.description = "Don't mess with the big dog"
        this.videos.addVideo(video2)

        this.searchVideos();
      })
    })

  }

  searchVideos(evt?) {
    console.log('[MyVideosPage] searchVideos()');
    let query = evt ? evt.target.value.trim() : this.query;
    this.videos.findVideos(query)
      .then((videos) => {
        this.myVideos = videos;
        console.log('[MyVideosPage] searchVideos() => ' + JSON.stringify(this.myVideos));
        this.changes.detectChanges();
      });
  }

  async enterVideo() {
    console.log('[MyVideosPage] enterVideo()');
    let prompt = await this.alertCtrl.create(
      {
        header: 'Select video',
        message: 'Enter video URL',
        inputs: [{ name: 'url', placeholder: 'URL' }],
        buttons: [{
          text: 'Cancel', role: 'cancel', handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: (data) => {
            console.log('URL ' + data.url + ' entered!!');
            this.addVideo(data.url);
          }
        }
        ]
      });
    await prompt.present();
  }

  selectVideo() {
    console.log('[MyVideosPage] selectVideo()');
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO
    };
    this.camera.getPicture(options)
      .then((url) => {
        console.log(Capacitor.convertFileSrc('file://' + url))
        this.addVideo(Capacitor.convertFileSrc('file://' + url));
      })
      .catch((err) => {
        // Handle error
        this.alertCtrl.create({
          header: 'Error',
          message: 'ERROR selecting video: ' + JSON.stringify(err),
          buttons: ['OK']
        }).then((alert) => alert.present());
      });
  }

  addVideo(url: string) {
    console.log(`[MyVideosPage] addVideo(${url})`);
    this.readVideoInfo(url)
      .then((video) => {
        this.modalCtrl.create({
          component: VideoEditorPage,
          componentProps: { mode: 'add', video: video }
        }).then((modal) => {
          modal.onDidDismiss()
            .then((evt: OverlayEventDetail) => {
              if (evt && evt.data) {
                this.videos.addVideo(evt.data)
                  .then(() => this.searchVideos());
              }
            });
          modal.present();
        });
      })
      .catch((err) => {
        // Handle error
        this.alertCtrl.create({
          header: 'Error',
          message: 'ERROR reading video info: ' + JSON.stringify(err),
          buttons: ['OK']
        }).then((alert) => alert.present());
      });
  }

  readVideoInfo(url: string, secs?: number): Promise<Video> {
    console.log(`readVideoInfo(${url},${secs})`);
    return new Promise((resolve, reject) => {
      let video: Video = {
        type: 'local',
        url: url,
        title: '',
        description: '',
        date: new Date().toDateString()
      };
      let videoNode: HTMLVideoElement = document.createElement('video');
      videoNode.onloadedmetadata = () => {
        // - get basic info
        video.width = videoNode.videoWidth;
        video.height = videoNode.videoHeight;
        video.duration = String(videoNode.duration) + ' secs';
        // - move to frame
        videoNode.currentTime = secs ? Math.min(secs, videoNode.duration) : 0;
      };
      videoNode.onseeked = (ev) => {
        // - capture thumbnail
        try {
          let canvas = document.createElement('canvas');
          canvas.height = videoNode.videoHeight;
          canvas.width = videoNode.videoWidth;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(videoNode, 0, 0, canvas.width, canvas.height);
          video.thumbnail = {
            url: canvas.toDataURL(),
            height: canvas.height,
            width: canvas.width
          };
        } catch (err) {
          console.log('videoNode.onseeked_error=' + JSON.stringify(err));
        } finally {
          resolve(video);
        }
      };
      videoNode.onerror = (ev) => {
        let error = {
          code: videoNode.error.code, message:
            videoNode.error.message
        };
        reject(error);
      };
      videoNode.src = url;
    });
  }

  showMenu(video) {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Add to playlist',
          icon: 'star',
          handler: () => {
            console.log('Add video to playlist!!');
            this.addToPlaylist(video);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('Delete video!!');
            this.deleteVideo(video);
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
          text: 'Edit',
          icon: 'create',
          handler: () => {
            console.log('Edit video!!');
            this.editVideo(video);
          },
        }]
    }).then((actionSheet) => actionSheet.present());
  }

  editVideo(video: Video) {
    console.log(`[MyVideosPage] editVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoEditorPage,
      componentProps: { mode: 'edit', video: video }
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
    console.log(`[MyVideosPage] playVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: { video: video }
    }).then((modal) => modal.present());
  }

  deleteVideo(video: Video) {
    console.log(`[MyVideosPage] deleteVideo(${video.id})`);
    this.alertCtrl.create({
      header: 'Delete video',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel', role: 'cancel', handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept', handler: () => {
            this.videos.removeVideo(video.id)
              .then(() => this.searchVideos());
          }
        }
      ]
    }).then((alert) => alert.present());
  }

  addToPlaylist(video: Video) {
    console.log(`[MyVideosPage] addToPlaylist(${video.id})`);
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
