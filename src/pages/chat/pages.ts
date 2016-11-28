import { Component, Output, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'chat',
  templateUrl: 'template.html',
})
export class Chat {
  user: String = "Ele Test"
  topicChats : any[] = [];

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , menu: MenuController
    , public appService: AppService) {

    this.user = appService.user;
    menu.enable(true);

    this.appService
      .getGroupsDialogs()
      .then((chats) => { this.topicChats = chats; })
  };
}
