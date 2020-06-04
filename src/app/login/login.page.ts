import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { UserPage } from '../user/user.page';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  password: string;
  constructor(private login: LoginService, private router: Router, private alertCtrl: AlertController, private modalCtrl: ModalController) { }
  ngOnInit() {
    const user: User = { name: 'Jordi', surname: 'Gomis', email: 'jordi', password:'gomis' };
    this.login.addUser(user);
   }
  doLogin() {
    console.log('[LoginPage] doLogin()');
    this.login.login(this.user, this.password)
      .then(() => { this.router.navigateByUrl('/tabs'); })
      .catch((err) => {
        this.alertCtrl.create({
          header: 'Authentication error',
          message: err.message,
          buttons: [{
            text: 'OK',
            role: 'cancel'
          }]
        }).then((alert) => alert.present());
      });
  }
  signup() {
    console.log('[LoginPage] signup()');
    this.modalCtrl.create({
      component: UserPage,
      componentProps: {
        mode: 'add'
      }
    }).then((modal) => { modal.present() });
  }
}