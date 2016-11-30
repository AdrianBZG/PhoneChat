import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { AppService } from '../../services/app.service';

@Component({
  styles: ['ion-icon { display: block; text-align: center; font-size: 10em; }'],
  templateUrl: 'template.html',
})
export class Settings {
  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public appService: AppService
    ) {}

  disconnect() {
    this.appService.disconnectChat();
    this.appService.unregister();
  }
}
