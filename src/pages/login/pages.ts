import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { SignUp } from '../signup/pages';
import { Chat } from '../chat/pages';

import { LoginService } from "../../services/login.service";

@Component({
  styles: ['ion-icon { display: block; text-align: center; font-size: 10em; }'],
  templateUrl: 'template.html',
  providers: [ LoginService ]
})
export class Login {
  password : string = "";
  userName : string = "";
  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public alertCtrl: AlertController
    , private loginService: LoginService) {}

  signup() {
    this.navCtrl.setRoot(SignUp)
  }

  login() {
    console.log("Login " + this.password + this.userName);
    try {
      this.loginService.login(this.userName, this.password);
      this.navCtrl.setRoot(Chat);
    }
    catch (err) {
      this.showError(err);
    }
  }

  showError(err : string) {
    let alert = this.alertCtrl.create({
        title: 'Invalid input',
        message: err,
        buttons: ['OK']
      });
    alert.present();
  }

}
