import { Component, Output, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';

import { Conversation } from '../conversation/pages';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'chat',
  templateUrl: 'template.html',
})
export class Chat {
  user: String = ""
  topicChats : any[] = [];

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public menu: MenuController
    , public appService: AppService) {

    this.user = appService.user;
    menu.enable(true);

    this.appService
      .getGroupsDialogs()
      .then((chats) => { this.topicChats = chats; })
  };

  /// Receive a chat form list of topicChats
  openChat(chat : any) {
    console.log("Opening Chat");
    this.appService.setCurrentActiveChat(chat);
    console.log("Push Conversation");
    this.navCtrl.push(Conversation);
  }
}
