import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video';
import { ModalController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer} from '@angular/platform-browser';

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

  constructor(private modalCtrl: ModalController, private sanitizer: DomSanitizer ) { }

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

  async changeImageTakeCamera() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.video.thumbnail.url = image.dataUrl
  }

  async changeImageTakeDevice() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    this.video.thumbnail.url = image.dataUrl
  }

  private clone(video: Video): Video {
    return {
      id: video.id,
      type: video.type,
      url: video.url,
      title: video.title,
      description: video.description,
      thumbnail: {
        url: video.thumbnail.url,
        width: video.thumbnail.width,
        height: video.thumbnail.height,
      },
      tags: video.tags,
      duration: video.duration,
      date: video.date,
      width: video.width,
      height: video.height
    };
  }

}
