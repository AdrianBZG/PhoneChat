import { Component, Output, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams } from 'ionic-angular';

import { SignUp } from '../signup/pages';
import { Chat } from '../chat/pages';


@Component({
  selector: 'login',
  templateUrl: 'template.html',
})
export class Login {
  password;
  email;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  signup() {
    this.navCtrl.setRoot(SignUp)
  }

  login() {
    console.log("Login"+ this.password + this.email)
    if (true) {
      this.navCtrl.setRoot(Chat);
    }
  }

}
