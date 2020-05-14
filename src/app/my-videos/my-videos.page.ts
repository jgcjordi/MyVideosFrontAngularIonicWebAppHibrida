import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideosService } from '../services/videos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.page.html',
  styleUrls: ['./my-videos.page.scss'],
})
export class MyVideosPage implements OnInit {
  private query = '';
  private myVideos: Video[] = [];

  constructor(private videos: VideosService, private alertCtrl: AlertController, ) { }

  ngOnInit() {
    console.log('ngOnInit MyVideosPage');
    this.searchVideos();
  }

  searchVideos(evt?) {
    console.log('[MyVideosPage] searchVideos()');
    let query = evt ? evt.target.value.trim() : this.query;
    this.videos.findVideos(query)
      .then((videos) => this.myVideos = videos);
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
            this.videos.addVideo(data.url);
          }
        }
        ]
      });
    await prompt.present();
  }

}
