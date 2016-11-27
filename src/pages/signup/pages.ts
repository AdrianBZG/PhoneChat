import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { SignupService } from '../../services/signup.service';

import { Login } from '../login/pages';
import { Chat } from '../chat/pages';

@Component({
  selector: 'signup',
  styles: ['ion-icon { display: block; text-align: center; font-size: 10em; }'],
  templateUrl: 'template.html',
  providers: [ SignupService ],
})
export class SignUp {
  userName : string = "";
  name : string = "";
  lastName : string = "";
  email : string = "";
  password : string = "";
  passwordRetype : string = "";

  constructor
    (public navCtrl: NavController
    , public navParams: NavParams
    , public alertCtrl: AlertController
    , private signupService: SignupService) {
  }

  login() {
    this.navCtrl.setRoot(Login);
  }

  signup() {
    console.log(this.userName)
    try {
      this.signupService.signup(
            this.userName
          , this.name
          , this.lastName
          , this.password
          , this.passwordRetype
          , this.email)
          .then((resp) => {
            console.log("setRoot")
            this.navCtrl.setRoot(Chat);
          },
          (err) => { this.showError(err); }
        );
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
