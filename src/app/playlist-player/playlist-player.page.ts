import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Playlist } from '../models/playlist';
import { Video } from '../models/video';
import { VideosService } from '../services/videos.service';
import { YoutubeVideosService } from '../services/youtube-videos.service';
import { collectExternalReferences } from '@angular/compiler';



@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.page.html',
  styleUrls: ['./playlist-player.page.scss'],
})
export class PlaylistPlayerPage implements OnInit {

  @Input()
  private playlist: Playlist;

  private playlistVideosRequesting: Video[] = [];
  private playlistVideos: Video[] = [];
  private video: Video;

  private YT: any;
  private player: any;

  constructor(private modalCtrl: ModalController, private domSanitizer: DomSanitizer,
    private youtubeVideosService: YoutubeVideosService, private videosService: VideosService) { }

  ngOnInit() {
    console.log('[PlaylistPlayerPage] ngOnInit()');
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.searchVideos()
  }

  close() {
    console.log('[PlaylistPlayerPage] close()');
    this.modalCtrl.dismiss();
  }

  searchVideos() {
    this.playlistVideosRequesting = []
    let requests = this.playlist.videosIds.map((videoid) => {
      return new Promise((resolve) => {
        this.searchVideo(videoid, resolve);
      });
    })
    Promise.all(requests).then(() => {
      console.log("all requests done")
      let _playlistVideos: Video[] = []
      this.playlist.videosIds.forEach((videoid) => {
        let index = this.playlistVideosRequesting.findIndex((video) => video.id === videoid);
        if(this.playlistVideosRequesting[index].url!=="Deleted"){
          _playlistVideos.push(this.playlistVideosRequesting[index])
        }
      })
      this.playlistVideos = _playlistVideos
      this.playlistVideosRequesting = []
      this.video = this.playlistVideos[0]

      if (this.video.type === "youtube") {
        if (window['YT']) {
          this.playVideoIframe(this.video.id);
        } else {
          window['onYouTubeIframeAPIReady'] = () => this.playVideoIframe(this.video.id);
        }
      }
    })
  }

  searchVideo(videoid: string, resolve) {
    if (Number(videoid)) {
      this.videosService.findVideoById(videoid).then(
        (localVideo) => {
          if (localVideo) {
            this.playlistVideosRequesting.push(localVideo)
            resolve()
          } else {
            let video: Video = {
              id: videoid,
              type: "local",
              url: "Deleted",
              title: "Deleted Video",
              description: "This video was removed form the app"
            }
            this.playlistVideosRequesting.push(video)
            resolve()
          }
        })
    } else {
      this.youtubeVideosService.findVideoById(videoid).then(
        (video) => {
          this.playlistVideosRequesting.push(video)
          resolve()
        })
    }
  }

  playVideoIframe(videoId: string) {
    console.log('[PlaylistPlayerPage] playVideoIframe()');
    console.log(videoId)
    this.player = new window['YT'].Player('player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  }

  onPlayerReady(event) {
    console.log('[PlaylistPlayerPage] onPlayerReady()');
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    console.log('[PlaylistPlayerPage] onPlayerStateChange()');
    if (event.data === 0) {//video finished
      console.log("Next video");
      this.nextVideo();
    }
  }

  nextVideo() {
    console.log('[PlaylistPlayerPage] nextVideo()');
    var index = this.playlistVideos.findIndex((video) => video.id === this.video.id);
    index++
    if (this.playlistVideos[index]) {
      console.log(index)
      this.video = this.playlistVideos[index]
      if (this.video.type === "youtube") {
        if(this.player){
          this.player.loadVideoById(this.video.id)
        }else{
          if (window['YT']) {
            this.playVideoIframe(this.video.id);
          } else {
            window['onYouTubeIframeAPIReady'] = () => this.playVideoIframe(this.video.id);
          }
        }
      }
    }
  }


}
