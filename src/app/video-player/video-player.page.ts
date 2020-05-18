import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close() {
    console.log('[VideoEditorPage] close()');
    this.modalCtrl.dismiss();
  }

}
