import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.page.html',
  styleUrls: ['./video-editor.page.scss'],
})
export class VideoEditorPage implements OnInit {

  @Input()
  private mode = 'view';
  @Input()
  private video: Video;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.video = this.clone(this.video);
  }

  close() {
    console.log('[VideoEditorPage] close()');
    this.modalCtrl.dismiss();
  }

  save() {
    console.log('[VideoEditorPage] save()');
    this.modalCtrl.dismiss(this.video);
  }

  private clone(video: Video): Video {
    return {
      id: video.id,
      type: video.type,
      url: video.url,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      tags: video.tags,
      duration: video.duration,
      date: video.date,
      width: video.width,
      height: video.height
    };
  }

}
