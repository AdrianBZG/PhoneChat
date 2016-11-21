import { Component, Output, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'chat',
  templateUrl: 'template.html',
})
export class Chat {
  user: String
  // Change to Signup
  //@Output() onSignup = new EventEmitter<boolean>();
  //@Output() onLogued = new EventEmitter<any>();  // Send user info session

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = "Ele Test"; // navParams.data....

  };
}
