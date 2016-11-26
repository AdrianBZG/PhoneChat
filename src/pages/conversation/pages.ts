import { Component, Output, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'chat',
  templateUrl: 'template.html',
})
export class Chat {
  user: String = "Ele Test"

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , menu: MenuController) {

    menu.enable(true);
  };
}
