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
    /*
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      // TODO: See way of get insesitive case in the pattern
      email: new FormControl("", Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")),
      password: new FormControl("", Validators.minLength(8)),
    });
    */
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
