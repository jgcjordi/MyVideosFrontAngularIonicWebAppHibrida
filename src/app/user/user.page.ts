import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @Input()
  private user: User = { name: '', surname: '', email: '' };
  @Input()
  private mode: string;
  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  
  constructor(private camera: Camera, private login: LoginService, private modalCtrl: ModalController) { }
  ngOnInit() { }
  close() {
    console.log('[UserPage] close()');
    this.modalCtrl.dismiss();
  }
  save() {
    console.log('[UserPage] save()');
    if (this.mode === 'edit') { this.login.updateUser(this.user); }
    else { this.login.addUser(this.user); }
    this.modalCtrl.dismiss();
  }
  changeAvatar() {
    console.log('[UserPage] changeAvatar()');
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.user.avatar = base64Image;
    }, (err) => { /* Handle error */ });
  }
}
