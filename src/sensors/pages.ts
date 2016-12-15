import { Component } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';

import { Settings } from '../settings/pages';
import { AppService } from '../../services/app.service';

declare function initializeGenericMap();

@Component({
  selector: 'sensors',
  templateUrl: 'template.html',
})
export class Sensors {
  GPSdata: String = ""


  /**
   * This class controll the diferents chat that an user can access.
   */
  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public menu: MenuController
    , public alertCtrl: AlertController
    , public appService: AppService) {

    menu.enable(true);
  };

  /**
   * Push new screen with chat selected
   */
  /*openChat(chat : DialogMsg) {
    this.appService.setCurrentActiveChat(chat);
  }*/
  initMap() {
    initializeGenericMap();
  }
}
