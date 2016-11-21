import { Component, Output, EventEmitter } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

declare var $;
declare var QB;

let serverURL = "http://phonechat.herokuapp.com/api/account/register";

enum ApiMessages {
  EMAIL_NOT_FOUND = 0,
  INVALID_PWD = 1,
  DB_ERROR = 2,
  NOT_FOUND = 3,
  EMAIL_ALREADY_EXISTS = 4,
  COULD_NOT_CREATE_USER = 5,
  PASSWORD_RESET_EXPIRED = 6,
  PASSWORD_RESET_HASH_MISMATCH = 7,
  PASSWORD_RESET_EMAIL_MISMATCH = 8,
  COULD_NOT_RESET_PASSWORD = 9,
  PASSWORD_CONFIRM_MISMATCH = 10,
}

import { Login } from '../login/pages';
import { Chat } from '../chat/pages';

@Component({
  selector: 'signup',
  templateUrl: 'template.html',
})
export class SignUp {
  emailReg : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  userName : string;
  name : string;
  lastName : string;
  email : string;
  password : string;
  passwordRetype : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  login() {
    this.navCtrl.setRoot(Login);
  }

  signup() {
    this.userName = this.userName.trim();
    if (this.userName == "") {
      return this.showError("Empty user name");
    }
    this.name = this.name.trim();
    if (this.name == "") {
      return this.showError("Empty name");
    }
    if (this.password.length <= 8) {
      return this.showError("Password too short");
    }
    if (this.password != this.passwordRetype) {
      return this.showError("Password Missmatch");
    }
    if (!this.emailReg.test(this.email)) {
      return this.showError("Not recognise as email");
    }
    $.ajax(
      { type: 'POST',
        url: serverURL,
        data: "email=" + this.email + "&firstName=" + this.name + "&lastName=" + this.lastName + "&password=" + this.password,
        success: (resp) => {
          if (resp.success === true) {
            QB.createSession((err,result) => {
              let params = { 'login': this.name, 'password': this.password};

              QB.users.create(params, (err, user) => {
                if (user) {
                  this.navCtrl.setRoot(Chat); // TODO Pass session
                } else  {
                  this.showError("Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.")
                }
              });
            });
            return;
          } else {
            if (resp.extras.msg) {
              switch (resp.extras.msg) {
                case ApiMessages.DB_ERROR:
                case ApiMessages.COULD_NOT_CREATE_USER:
                  // TODO: Use a friendlier error message below.
                  this.showError("Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.")
                  break;
                case ApiMessages.EMAIL_ALREADY_EXISTS:
                  this.showError("The email address that you provided is already registered.");
                  break;
              }
            }
          }
        },
        error: (e) => {
          console.log(e);
          // TODO: Use a friendlier error message below.
          this.showError("Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.");
        }
      }
    );

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
